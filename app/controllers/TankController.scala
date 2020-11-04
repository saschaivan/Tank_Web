package controllers

import com.google.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}
import de.htwg.se.Tank.{Tank, controller}
import de.htwg.se.Tank.model.gameComponent.gameBase.Map

class TankController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gamecontroller = Tank.controller
  var map : Map.type = Map
  gamecontroller.setDefaultGame()

  def about = Action {
    Ok(views.html.index())
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


}
