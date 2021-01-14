package controllers

import akka.actor.{Actor, ActorRef}
import com.google.inject.{Guice, Inject}
import de.htwg.se.Tank.controller.controllerComponent.{ControllerInterface, Fire, Hit, NewGame, UpdateMap}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, WebSocket}
import de.htwg.se.Tank.{Tank, TankModule, controller}
import de.htwg.se.Tank.model.gameComponent.gameBase.Map
import javax.inject.Singleton
import de.htwg.se.Tank.model.fileIoComponent.fileIoJsonImpl.FileIO
import de.htwg.se.Tank.model.playerComponent.playerBase.{Player, Position}
import play.api.libs.streams.ActorFlow
import play.twirl.api.HtmlFormat
import views.html.TankMenu

import scala.swing.Reactor
import akka.actor.{ActorRefFactory, ActorSystem}
import akka.stream.Materializer
import akka.actor._
import play.api.Play.materializer
import play.api.libs.json.{JsValue, Json}

@Singleton
class TankController @Inject()(cc: ControllerComponents)(implicit System: ActorSystem, mat:Materializer) extends AbstractController(cc) {
  val injector = Guice.createInjector(new TankModule)
  val gamecontroller = injector.getInstance(classOf[ControllerInterface])
  gamecontroller.setGame("", 0, "small", "Sascha", "Yue")
  gamecontroller.publish(new NewGame)
  Map.activePlayer = Map.p1
  val fileIO = new FileIO
  var game = gamecontroller.getGame
  Map.setFX(Option(0));
  var mapcoordinates = Map.getFXList(true);

  def setParameter = {
    var player1 = Map.getPlayer(1)
    var player2 = Map.getPlayer(2)
    player1.pos = Position(240, 350)
    player2.pos = Position(1100, 350)
  }

  def startGame(): Unit = {
    gamecontroller.setGame("", 0, "small", "Sascha", "Yue")
    gamecontroller.publish(new NewGame)
    Map.activePlayer = Map.p1
  }

  def menu = Action {
    Ok(views.html.TankMenu())
  }

  def about = Action {
    Ok(views.html.index())
  }

  def controls = Action {
    Ok(views.html.controls())
  }

  def tank = Action {
    //startGame()
    Ok(views.html.tank(gamecontroller))
  }

  def sendMapCoordinates() = Action {
    Ok(Json.obj("map" -> mapcoordinates))
  }

  def moveLeft = Action {
    gamecontroller.moveLeft()
    if (Map.moves == 0)
      game.changePlayer()
    Ok(fileIO.gameToJson(game))
  }

  def moveRight = Action {
    gamecontroller.moveRight()
    if (Map.moves == 0)
      game.changePlayer()
    Ok(fileIO.gameToJson(game))
  }

  def shoot = Action {
    gamecontroller.shoot(5)
    Ok(views.html.tank(gamecontroller))
  }

  def moveAngleUp = Action {
    gamecontroller.moveAngleUp()
    Ok(views.html.tank(gamecontroller))
  }

  def moveAngleDown = Action {
    gamecontroller.moveAngleUp()
    Ok(views.html.tank(gamecontroller))
  }

  def changePlayer = Action {
    gamecontroller.changePlayer()
    Ok(views.html.tank(gamecontroller))
  }

  def redo = Action {
    gamecontroller.redo
    Ok(views.html.tank(gamecontroller))
  }

  def undo = Action {
    gamecontroller.undo
    Ok(views.html.tank(gamecontroller))
  }

  def PowerPlus = Action {
    gamecontroller.powerUp()
    Ok(views.html.tank(gamecontroller))
  }

  def PowerMinus = Action {
    gamecontroller.powerDown()
    Ok(views.html.tank(gamecontroller))
  }

  def gameToJson() = Action {
    gamecontroller.save
    Ok(fileIO.gameToJson(game))
  }

  def socket = WebSocket.accept[JsValue, JsValue] { request =>
    ActorFlow.actorRef { out =>
      TankWebSocketActorFactory.create(out)
    }
  }

  object TankWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new TankWebSocketActor(out))
    }
  }

  class TankWebSocketActor(out:ActorRef) extends Actor with Reactor {
    listenTo(gamecontroller)
    override def receive = {
      case msg: String =>
        out ! fileIO.gameToJson(game)
        println("Sent Json to Client" + msg)
      case "ping" => out ! Json.obj("alive" -> "pong")
    }

    reactions += {
      case event: NewGame => sendJsonToClient
      case event: UpdateMap => sendJsonToClient
      case event: Fire => sendJsonToClient
      case event: Hit => sendJsonToClient
    }

    def sendJsonToClient = {
      out ! fileIO.gameToJson(game)
    }
  }
}
