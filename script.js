class GarageSystem {
    constructor() {
        this.parkingStack = [];
        this.carCounters = {};
        this.totalCounters = { arrivalCount: 0, departureCount: 0 };
        this.MAX_CAPACITY = 10;
    }

    isFull() {
        return this.parkingStack.length >= this.MAX_CAPACITY;
    }

    handleArrival(plateNumber) {
        if (this.isFull()) {
            return { success: false, message: "Sorry, parking is full!" };
        }

        this.parkingStack.push(plateNumber);
        this.carCounters[plateNumber] = (this.carCounters[plateNumber] || 0) + 1;
        this.totalCounters.arrivalCount++;
        return { 
            success: true, 
            message: `Car with plate number ${plateNumber} has arrived and parked.`
        };
    }

    handleDeparture(plateNumber) {
        if (!this.parkingStack.length) {
            return { success: false, message: "Error: Parking is empty!" };
        }

        if (!this.parkingStack.includes(plateNumber)) {
            return { 
                success: false, 
                message: `Error: Car with plate number ${plateNumber} is not in the parking garage.`
            };
        }

        const tempStack = [];
        let found = false;

        // Remove cars until we find the target
        while (this.parkingStack.length) {
            const currentCar = this.parkingStack.pop();
            if (currentCar === plateNumber) {
                found = true;
                break;
            }
            tempStack.push(currentCar);
            this.totalCounters.departureCount++;
            this.carCounters[currentCar] = (this.carCounters[currentCar] || 0) + 1;
        }

        // Put back the temporarily removed cars
        while (tempStack.length) {
            const car = tempStack.pop();
            this.parkingStack.push(car);
            this.totalCounters.arrivalCount++;
            this.carCounters[car] = (this.carCounters[car] || 0) + 1;
        }

        if (found) {
            this.totalCounters.departureCount++;
            this.carCounters[plateNumber] = (this.carCounters[plateNumber] || 0) + 1;
            return { 
                success: true, 
                message: `Car with plate number ${plateNumber} has departed.`
            };
        }

        return { 
            success: false, 
            message: "Error: Something went wrong during departure."
        };
    }

    getStatus() {
        return {
            parkedCars: [...this.parkingStack],
            totalArrivals: this.totalCounters.arrivalCount,
            totalDepartures: this.totalCounters.departureCount,
            totalMovements: Object.values(this.carCounters).reduce((a, b) => a + b, 0)
        };
    }
}

// UI Controller
class ParkingGarageUI {
    constructor() {
        this.garage = new GarageSystem();
        this.initializeElements();
        this.attachEventListeners();
        this.initializeGarageVisualization();
        this.updateUI();
        this.isAnimating = false;
    }

    initializeElements() {
        // Input elements
        this.plateInput = document.getElementById('plateNumber');
        this.parkButton = document.getElementById('parkButton');
        this.removeButton = document.getElementById('removeButton');
        this.randomPlateButton = document.getElementById('randomPlateButton');
        this.themeToggle = document.getElementById('themeToggle');

        // Display elements
        this.capacityBar = document.getElementById('capacityBar');
        this.capacityLabel = document.getElementById('capacityLabel');
        this.totalArrivals = document.getElementById('totalArrivals');
        this.totalDepartures = document.getElementById('totalDepartures');
        this.totalMovements = document.getElementById('totalMovements');
        this.parkedCarsList = document.getElementById('parkedCarsList');
        this.noticeMessage = document.getElementById('noticeMessage');

        // Add visualization elements
        this.garageStack = document.getElementById('garageStack');
        this.initializeGarageVisualization();
        
        // Initialize theme
        this.initializeTheme();
    }

    initializeGarageVisualization() {
        this.garageStack.innerHTML = '';
        for (let i = 0; i < this.garage.MAX_CAPACITY; i++) {
            const spot = document.createElement('div');
            spot.className = 'parking-spot';
            spot.dataset.index = i;
            this.garageStack.appendChild(spot);
        }
    }

    generateRandomPlate() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let plate = '';
        
        // Generate 3 random letters
        for (let i = 0; i < 3; i++) {
            plate += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        plate += ' '; // Add space
        
        // Generate 3 random numbers
        for (let i = 0; i < 3; i++) {
            plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        
        return plate;
    }

    async animateCarEntry(plateNumber, spotIndex) {
        const spot = this.garageStack.children[this.garage.MAX_CAPACITY - 1 - spotIndex];
        
        // Set up the spot with the plate number but keep it invisible
        spot.classList.add('occupied');
        spot.textContent = plateNumber;
        spot.style.opacity = '0';
        
        // Small delay to ensure styles are applied
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Make visible and start animation
        spot.style.opacity = '1';
        spot.classList.add('entering');
        
        // Wait for animation to complete
        return new Promise(resolve => {
            spot.addEventListener('animationend', () => {
                spot.classList.remove('entering');
                resolve();
            }, { once: true });
        });
    }

    async animateCarExit(spotIndex) {
        const spot = this.garageStack.children[this.garage.MAX_CAPACITY - 1 - spotIndex];
        spot.classList.add('exiting');
        
        return new Promise(resolve => {
            spot.addEventListener('animationend', () => {
                spot.classList.remove('occupied', 'exiting');
                spot.textContent = '';
                resolve();
            }, { once: true });
        });
    }

    async animateCarMove(fromIndex, toIndex, isExiting = false) {
        const spot = this.garageStack.children[this.garage.MAX_CAPACITY - 1 - fromIndex];
        const plateNumber = spot.textContent;
        
        // Move car up to gate
        spot.classList.add('moving', 'moving-up');
        await new Promise(resolve => {
            spot.addEventListener('animationend', () => {
                resolve();
            }, { once: true });
        });
        
        // Clear original spot
        spot.classList.remove('occupied', 'moving', 'moving-up');
        spot.textContent = '';
        
        if (!isExiting) {
            // Move to new position
            const newSpot = this.garageStack.children[this.garage.MAX_CAPACITY - 1 - toIndex];
            newSpot.classList.add('occupied', 'moving', 'moving-down');
            newSpot.textContent = plateNumber;
            
            await new Promise(resolve => {
                newSpot.addEventListener('animationend', () => {
                    newSpot.classList.remove('moving', 'moving-down');
                    resolve();
                }, { once: true });
            });
        }
    }

    initializeTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    attachEventListeners() {
        this.parkButton.addEventListener('click', () => this.handleParkCar());
        this.removeButton.addEventListener('click', () => this.handleRemoveCar());
        this.randomPlateButton.addEventListener('click', () => {
            this.plateInput.value = this.generateRandomPlate();
            this.clearNotice();
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Input validation
        this.plateInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase();
            this.clearNotice();
        });
    }

    showNotice(message, isError = false) {
        this.noticeMessage.textContent = message;
        this.noticeMessage.className = 'notice-message ' + (isError ? 'error' : 'success');
    }

    clearNotice() {
        this.noticeMessage.textContent = '';
        this.noticeMessage.className = 'notice-message';
    }

    updateUI() {
        const status = this.garage.getStatus();
        const usedSpaces = this.garage.parkingStack.length;

        // Update capacity indicator
        this.capacityBar.style.width = `${(usedSpaces / this.garage.MAX_CAPACITY) * 100}%`;
        this.capacityLabel.textContent = `Available Spaces: ${this.garage.MAX_CAPACITY - usedSpaces}/${this.garage.MAX_CAPACITY}`;

        // Update statistics
        this.totalArrivals.textContent = `Total Arrivals: ${status.totalArrivals}`;
        this.totalDepartures.textContent = `Total Departures: ${status.totalDepartures}`;
        this.totalMovements.textContent = `Total Movements: ${status.totalMovements}`;

        // Update parked cars list
        this.parkedCarsList.innerHTML = '';
        if (status.parkedCars.length) {
            // Create array of cars in reverse order (last in at the top)
            const reversedCars = [...status.parkedCars].reverse();
            
            reversedCars.forEach((plate, index) => {
                const listItem = document.createElement('div');
                listItem.className = 'car-list-item';
                
                // Car number with position (counting from top)
                const carInfo = document.createElement('span');
                carInfo.textContent = `${index + 1}. ${plate}`;
                
                // Remove button
                const removeBtn = document.createElement('button');
                removeBtn.className = 'car-remove-btn';
                removeBtn.textContent = 'Remove';
                removeBtn.onclick = () => {
                    if (!this.isAnimating) {
                        this.plateInput.value = plate;
                        this.handleRemoveCar();
                    }
                };
                
                listItem.appendChild(carInfo);
                listItem.appendChild(removeBtn);
                this.parkedCarsList.appendChild(listItem);
            });
        } else {
            const p = document.createElement('p');
            p.className = 'empty-message';
            p.textContent = 'No cars currently parked';
            this.parkedCarsList.appendChild(p);
        }

        // Update visualization
        const spots = this.garageStack.children;
        for (let i = 0; i < this.garage.MAX_CAPACITY; i++) {
            const spot = spots[this.garage.MAX_CAPACITY - 1 - i];
            const car = this.garage.parkingStack[i];
            
            if (car) {
                spot.classList.add('occupied');
                spot.textContent = car;
            } else {
                spot.classList.remove('occupied');
                spot.textContent = '';
            }
        }
    }

    async handleParkCar() {
        if (this.isAnimating) return;
        
        const plateNumber = this.plateInput.value.trim();
        if (!plateNumber) {
            this.showNotice('Please enter a license plate number.', true);
            return;
        }

        this.isAnimating = true;
        const result = this.garage.handleArrival(plateNumber);
        
        if (result.success) {
            // First update the internal state
            this.updateUI();
            
            // Then animate the car entry
            await this.animateCarEntry(plateNumber, this.garage.parkingStack.length - 1);
            
            // Show success message after animation completes
            this.showNotice(result.message, !result.success);
        } else {
            // Show error message immediately if parking failed
            this.showNotice(result.message, !result.success);
        }
        
        this.plateInput.value = '';
        this.isAnimating = false;
        this.updateExplanationPane(`Car with plate number ${plateNumber} parked using LIFO (Last In, First Out) strategy.`);
    }

    async handleRemoveCar() {
        if (this.isAnimating) return;
        
        const plateNumber = this.plateInput.value.trim();
        if (!plateNumber) {
            this.showNotice('Please enter a license plate number.', true);
            return;
        }

        this.isAnimating = true;
        const targetIndex = this.garage.parkingStack.indexOf(plateNumber);
        
        if (targetIndex === -1) {
            this.showNotice(`Error: Car with plate number ${plateNumber} is not in the parking garage.`, true);
            this.isAnimating = false;
            return;
        }

        // Store cars that need to be moved
        const carsToMove = this.garage.parkingStack.slice(targetIndex + 1);
        const originalPositions = carsToMove.map((_, i) => targetIndex + 1 + i);

        // Move cars above target through the gate
        for (let i = carsToMove.length - 1; i >= 0; i--) {
            await this.animateCarMove(targetIndex + 1 + i, 0, true);
            await new Promise(resolve => setTimeout(resolve, 300)); // Pause between cars
        }

        // Remove target car through gate
        await this.animateCarExit(targetIndex);
        await new Promise(resolve => setTimeout(resolve, 300)); // Pause after exit

        // Move cars back down through gate
        for (let i = 0; i < carsToMove.length; i++) {
            const newPosition = originalPositions[i] - 1;
            const spot = this.garageStack.children[this.garage.MAX_CAPACITY - 1 - newPosition];
            spot.classList.add('occupied', 'entering');
            spot.textContent = carsToMove[i];
            
            await new Promise(resolve => {
                spot.addEventListener('animationend', () => {
                    spot.classList.remove('entering');
                    resolve();
                }, { once: true });
            });
            await new Promise(resolve => setTimeout(resolve, 300)); // Pause between cars
        }

        const result = this.garage.handleDeparture(plateNumber);
        this.showNotice(result.message, !result.success);
        this.plateInput.value = '';
        this.updateUI();
        this.isAnimating = false;
        this.updateExplanationPane(`Car with plate number ${plateNumber} removed using LIFO (Last In, First Out) strategy.`);
    }

    updateExplanationPane(message) {
        const explanationText = document.getElementById('explanationText');
        explanationText.textContent = message;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ParkingGarageUI();
});

function updateNotice(message) {
    const noticeMessage = document.getElementById('noticeMessage');
    if (message) {
        noticeMessage.textContent = message;
    } else {
        noticeMessage.textContent = 'No current notices';
    }
}