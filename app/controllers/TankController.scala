package controllers

import com.google.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}
import de.htwg.se.Tank.{Tank, controller}

class TankController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gamecontroller = Tank.controller

  gamecontroller.setDefaultGame()
  def tankastext = gamecontroller.gametoString

  def about = Action {
    Ok(views.html.index())
  }

  def tank = Action {
    Ok(tankastext)
  }
}
