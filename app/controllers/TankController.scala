package controllers

import com.google.inject.{Guice, Inject}
import de.htwg.se.Tank.controller.controllerComponent.ControllerInterface
import play.api.mvc.{AbstractController, ControllerComponents}
import de.htwg.se.Tank.{Tank, TankModule, controller}
import de.htwg.se.Tank.model.gameComponent.gameBase.Map
import javax.inject.Singleton

@Singleton
class TankController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val injector = Guice.createInjector(new TankModule)
  val gamecontroller = injector.getInstance(classOf[ControllerInterface])
  gamecontroller.setDefaultGame()

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


}
