package controllers

import com.google.inject.{Guice, Inject}
import de.htwg.se.Tank.controller.controllerComponent.ControllerInterface
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, WebSocket}
import de.htwg.se.Tank.{Tank, TankModule, controller}
import de.htwg.se.Tank.model.gameComponent.gameBase.Map
import javax.inject.Singleton
import de.htwg.se.Tank.model.fileIoComponent.fileIoJsonImpl.FileIO
import de.htwg.se.Tank.model.playerComponent.playerBase.{Player, Position}
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._
import play.api.libs.json.{JsValue, Json}
import play.twirl.api.HtmlFormat
import views.html.TankMenu

import scala.swing.Reactor

@Singleton
class TankController @Inject()(cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {
  val injector = Guice.createInjector(new TankModule)
  val gamecontroller = injector.getInstance(classOf[ControllerInterface])
  gamecontroller.setGame("", 0, "small", "Sascha", "Yue")
  val game = gamecontroller.getGame

  //var gameJson: JsValue = Json.parse("{}")

  def setParameter = {
    var player1 = Map.getPlayer(1)
    var player2 = Map.getPlayer(2)
    player1.pos = Position(240, 350)
    player2.pos = Position(1100, 350)
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
    Ok(views.html.tank(gamecontroller))
  }

  def moveLeft = Action {
    gamecontroller.moveLeft()
    Ok(views.html.tank(gamecontroller))
  }

  def moveRight = Action {
    gamecontroller.moveRight()
    Ok(views.html.tank(gamecontroller))
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
    val fileIO = new FileIO
    setParameter
    gamecontroller.save
    Ok(fileIO.gameToJson(game))
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      TankWebSocketActorFactory.create(out)
    }
  }

  object TankWebSocketActorFactory{
    def create(out: ActorRef) = {
      Props(new TankWebSockeActor(out))
    }
  }

  class TankWebSockeActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gamecontroller)

    def receive: Actor.Receive = {
      case msg: String =>
        //out ! (gamecontroller.toJson.toString)
        println("Sent Json to Client:" + msg)
    }

    reactions += {

    }

    def sendJsonToClient = {
      println("Received event from Controller")
      //out ! (gamecontroller.toJson.toString)
    }
  }


}
