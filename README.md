# PUP-CEA Parking Garage Management System

## Overview

This project simulates a parking garage management system for the Polytechnic University of the Philippines - College of Engineering and Architecture (PUP-CEA). It utilizes a stack data structure (LIFO - Last In, First Out) to manage the parking of vehicles. The system tracks arrivals, departures, and the current status of the parking garage, providing a simple yet effective way to visualize parking operations.

## Features

-   **Real-time Parking Status:** Displays the number of available spaces and the total capacity of the parking garage.
-   **Vehicle Tracking:** Allows users to simulate parking and removing cars using their license plate numbers.
-   **Arrival and Departure Logs:** Keeps track of the total number of arrivals and departures.
-   **Movement Counter:** Calculates the total movements (arrivals and departures combined) within the garage.
-   **Error Handling:** Provides informative messages for scenarios like a full garage, empty garage, or when a car is not found during removal.
-   **Responsive Design:** Adapts to different screen sizes for optimal viewing on various devices.

## Data Structure

The core of the parking management system is based on the **stack** data structure, which follows the **LIFO (Last In, First Out)** principle. This means that the last car to enter the garage will be the first one to leave, similar to how a stack of plates works.

## Technologies Used

-   **HTML:** For structuring the web page.
-   **CSS:** For styling and layout.
-   **JavaScript:** For implementing the parking logic and user interface interactions.

## How to Use

1. **Clone the repository:**

    ```bash
    git clone <https://github.com/cikeyz/Case-Study-2-DSA-G3>
    ```

2. **Open `index.html` in your web browser.**

3. **Interact with the system:**

    -   Enter a license plate number in the input field.
    -   Click "Park Car" to simulate a car entering the garage.
    -   Click "Remove Car" to simulate a car leaving the garage.
    -   Observe the real-time updates in the "Current Status" panel.

## Project Structure

-   **`index.html`:** The main HTML file containing the structure of the web application.
-   **`styles.css`:** The CSS file with styles for the application.
-   **`script.js`:** The JavaScript file containing the `GarageSystem` and `ParkingGarageUI` classes that handle the parking logic and UI interactions.

## Classes

### `GarageSystem`

This class manages the parking logic, including:

-   `parkingStack`: An array representing the stack of parked cars.
-   `carCounters`: An object tracking the number of times each car has entered and exited.
-   `totalCounters`: An object tracking total arrivals and departures.
-   `MAX_CAPACITY`: A constant defining the maximum capacity of the garage.
-   Methods: `isFull()`, `handleArrival()`, `handleDeparture()`, `getStatus()`.

### `ParkingGarageUI`

This class handles user interface interactions and updates, including:

-   Methods to initialize UI elements, attach event listeners, and update the UI based on the `GarageSystem`'s status.
-   Methods: `initializeElements()`, `attachEventListeners()`, `showModal()`, `hideModal()`, `updateUI()`, `handleParkCar()`, `handleRemoveCar()`.

## Contributing

Contributions to this project are welcome! If you find any bugs or want to suggest improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Carl Kristian "CK" Ortiz
