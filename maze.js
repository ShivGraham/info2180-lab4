'use strict';

window.onload = function () 
{
	
	var topLeft = document.getElementById("boundary1"); //gets top left div [wall] and assigns it to the variable 'topLeft'
	var allWalls = document.querySelectorAll(".boundary"); //gets all the walls and assigns them to the variable 'allWalls'
	var end = document.getElementById("end"); //gets the end square and assigns it to the variable 'end'
	var start = document.getElementById("start"); //gets the start square and assigns it to the variable 'start'
	var status = document.getElementById("status"); //gets the status message and assigns it to the variable 'status'
	var maze = document.getElementById("maze"); //gets the entire maze and assigns it to the variable 'maze'

	var touched = false; //tracks whether any wall was moused over; initialised to false	
	var statusInfo = status.textContent; //gets the initial status message and assigns it to the variable 'statusInfo'
	var started = false; //tracks whether the start square was clicked; initialised to false

	var mazeLeft = maze.offsetLeft; //gets the offset left value of the maze
	var mazeTop = maze.offsetTop; //gets the offset top value of the maze
	var mazeHeight = maze.offsetHeight; //gets the offset height value of the maze
	var mazeWidth = maze.offsetWidth; //gets the offset width value of the maze

	topLeft.onmouseover = function ()
	{
		topLeft.setAttribute("class", "boundary youlose"); //changes the colour of the top left div [wall] to red when its hovered over
	}

	for (var i = 0; i < allWalls.length; i++) //iterates through all the walls
	{
		var wall = allWalls[i];

		wall.onmouseover = function () //on mousing over a specific wall
		{	
			touched = true; //variable 'touched' 's state is changed to true when a wall is touched [hovered over]
			status.textContent = "You lose!"; //if any wall was touched, it displays a non-congratulatory message

			for (var x = 0; x < allWalls.length; x++) //changes all the walls to red upon the mouse hovering over any one wall
			{
				redWall (allWalls[x]);				
			}
		}
	}

	function redWall (ele)  //helper function
	{
		ele.setAttribute("class", "boundary youlose");	//changes the colour of the wall to red
	}

	end.onmouseover = function () 
	{
		if (touched === false && started === true) //checks whether any wall was touched and the game was started
		{
			//alert("You win!");	//if none were touched, and the end was reached, then it displays a congratulatory message
			status.textContent = "You win!"; //if none were touched, and the end was reached, then it displays a congratulatory message
		}
	}

	
	start.onclick = function () //when the start square is clicked, all the boundaries are reset if they were turned red
	{
		started = true;

		allWalls = document.querySelectorAll(".boundary");

		status.textContent = statusInfo; //returns the status message to its original message

		for (var z = 0; z < allWalls.length; z++)
		{
			var wallClass = allWalls[z].getAttribute("class"); //gets the class for the wall and assigns it to the variable 'wallClass'

			if (wallClass === 'boundary youlose') //if the class of the wall has been turned red, it resets it to the original state
			{
				originalWall (allWalls[z]); //resets the walls to their original state
				touched = false; //the touched variable is also reset to as if it wasn't touched [hovered over]				
			}

		}
		

		document.onmousemove = function (event) //tracks the mouse as it moves over the entire document
		{
			var xValue = event.clientX; //gets the x coordinate of the mouse
			var yValue = event.clientY; //gets tehe y coordinate of the mouse
		
			//calculations

			var totalMazeWidth = xValue + mazeWidth;
			var mazeLength = yValue + mazeHeight;

			if (xValue < mazeLeft || yValue < mazeTop || xValue > totalMazeWidth || yValue > mazeLength) //if the x coordinate is outside of the maze
			{
				for (var x = 0; x < allWalls.length; x++) //changes all the walls to red upon the mouse hovering over any one wall
				{
					redWall (allWalls[x]);				
				} 
				
				touched = true; 
				status.textContent = "You lose!";
			}			
		}
	}

	function originalWall (ele) //helper function
	{
		ele.setAttribute("class", "boundary"); //resets the wall to its original state
	}
}