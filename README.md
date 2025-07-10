<div align="center">

# **ParkStacks**

### _A dynamic parking garage simulator that visualizes the Stack data structure. 🚗_

<!-- Badges are a great way to show project status at a glance! -->
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/cikeyz/park-stacks?style=for-the-badge&color=6C5CE7">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/cikeyz/park-stacks?style=for-the-badge&color=blue">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/cikeyz/park-stacks?style=for-the-badge&color=green">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/cikeyz/park-stacks?style=for-the-badge&color=orange">
  <img alt="GitHub license" src="https://img.shields.io/github/license/cikeyz/park-stacks?style=for-the-badge&color=informational">
</p>

</div>

---

## 🚀 Overview

Welcome to **ParkStacks**! This project is an interactive, web-based simulation of a single-lane parking garage, designed to visually demonstrate the **Stack** data structure and its "Last-In, First-Out" (LIFO) principle.

The main goal was to take an abstract computer science concept and make it tangible and easy to understand. I started this project to create an engaging educational tool that shows how data structures power real-world logic. Whether you're a student learning about stacks for the first time or a developer who enjoys clever visualizations, I hope you find this project both fun and informative!

---

## ✨ Features

Here are some of the cool things this project can do:

* **Interactive Stack Visualization:** Watch cars park and depart in real-time, clearly illustrating the LIFO (Last-In, First-Out) behavior of a stack.
* **Animated Operations:** Smooth CSS animations for cars entering, exiting, and being temporarily moved to allow another car to depart.
* **Real-time Status Dashboard:** Keep track of available spaces, total arrivals, total departures, and a list of currently parked cars.
* **Dynamic Light/Dark Theme:** A sleek theme toggle that adapts to your preference and saves it in local storage for your next visit.
* **Clear User Feedback:** Receive instant notices for operations, such as when the garage is full, a car is not found, or a car has successfully parked or departed.
* **Responsive Design:** A clean and modern interface that works beautifully on desktops, tablets, and mobile devices.

---

## 🛠️ Installation & Setup

Getting this project up and running is as simple as it gets. No complex builds or dependencies needed!

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/cikeyz/park-stacks.git](https://github.com/cikeyz/park-stacks.git)
    cd park-stacks
    ```

2.  **Open in your browser**
    * Simply open the `index.html` file in any modern web browser.

And that's it! You're ready to start simulating.

---

## 💡 Usage Examples

Using the simulator is straightforward and interactive:

* **To Park a Car:** Enter a license plate number in the input field and click the "Park" button. Watch as the car animates into the first available spot.
* **To Depart a Car:** Enter the license plate of a parked car and click the "Depart" button. If the car is not at the top of the stack, other cars will animate out of the way to let it pass.
* **To Use a Random Plate:** Click the "Random Plate" button to generate a sample license plate number for quick testing.
* **To Change the Theme:** Use the theme toggle button in the header to switch between light and dark modes.

---

## 💻 Tech Stack / Dependencies

This project was built with a focus on fundamentals and a clean, vanilla implementation.

* **Frontend:** HTML5, CSS3, and modern JavaScript (ES6+)
* **Core Logic:** A `GarageSystem` class that implements the stack data structure using a JavaScript Array to manage all parking logic.
* **UI Management:** A `ParkingGarageUI` class to handle all DOM manipulation, event listeners, and animations.
* **Styling:** Custom CSS variables for dynamic theming and animations.
* **Storage:** Browser LocalStorage for persisting the user's theme preference.

---

## 🙌 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Found a bug? Don't worry, we all create them. Just open an issue and I'll take a look!

---

## 📜 License

This project is distributed under the MIT License. See the `LICENSE` file for more information. It's pretty permissive, so you can do almost anything you want with it.

---

## 📬 Contact

**Carl Kristian (CK) Ortiz**

* GitHub: [@cikeyz](https://github.com/cikeyz)
* LinkedIn: [ck-ortiz](https://www.linkedin.com/in/ck-ortiz)
* Email: [carlkristianrortiz@iskolarngbayan.pup.edu.ph](mailto:carlkristianrortiz@iskolarngbayan.pup.edu.ph)

<br>

<div align="center">
  __Crafted with ☕ and a bit of chaos.__
</div>
