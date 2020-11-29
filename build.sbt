name := "Tank_Web"
 
version := "1.0" 
      
lazy val `tank_web` = (project in file(".")).enablePlugins(PlayScala)

lazy val root = (project in file("."))
  .enablePlugins(PlayScala).settings(
  name := """Tank""",
  version := "1.0-SNAPSHOT",
  scalaVersion := "2.12.4",
  libraryDependencies ++= Seq(
    guice,
    "com.h2database" % "h2" % "1.4.199",
    "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test,
    "de.htwg.se" %% "tank" % "0.0.1"
  ),
  scalacOptions ++= Seq(
    "-feature",
    "-deprecation",
    "-Xfatal-warnings"
  )
)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"
      
scalaVersion := "2.12.4"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice )

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

includeFilter in (Assets, LessKeys.less) := "tank.less" | "menu.less" | "about.less"

javaOptions ++= Seq("", "-Djdk.lang.Process.allowAmbiguousCommands=true")

