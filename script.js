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
        this.updateUI();
    }

    initializeElements() {
        // Input elements
        this.plateInput = document.getElementById('plateNumber');
        this.parkButton = document.getElementById('parkButton');
        this.removeButton = document.getElementById('removeButton');

        // Display elements
        this.capacityBar = document.getElementById('capacityBar');
        this.capacityLabel = document.getElementById('capacityLabel');
        this.totalArrivals = document.getElementById('totalArrivals');
        this.totalDepartures = document.getElementById('totalDepartures');
        this.totalMovements = document.getElementById('totalMovements');
        this.parkedCarsList = document.getElementById('parkedCarsList');

        // Modal elements
        this.modal = document.getElementById('messageModal');
        this.modalMessage = document.getElementById('modalMessage');
        this.modalClose = document.getElementById('modalClose');
    }

    attachEventListeners() {
        this.parkButton.addEventListener('click', () => this.handleParkCar());
        this.removeButton.addEventListener('click', () => this.handleRemoveCar());
        this.modalClose.addEventListener('click', () => this.hideModal());
        
        // Input validation
        this.plateInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        });
    }

    showModal(message, isError = false) {
        this.modalMessage.textContent = message;
        this.modalMessage.style.color = isError ? '#ea4335' : '#34a853';
        this.modal.classList.add('show');
    }

    hideModal() {
        this.modal.classList.remove('show');
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
            status.parkedCars.reverse().forEach((plate, index) => {
                const p = document.createElement('p');
                p.textContent = `${index + 1}. ${plate}`;
                this.parkedCarsList.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.className = 'empty-message';
            p.textContent = 'No cars currently parked';
            this.parkedCarsList.appendChild(p);
        }
    }

    handleParkCar() {
        const plateNumber = this.plateInput.value.trim();
        if (!plateNumber) {
            this.showModal('Please enter a license plate number.', true);
            return;
        }

        const result = this.garage.handleArrival(plateNumber);
        this.showModal(result.message, !result.success);
        this.plateInput.value = '';
        this.updateUI();
    }

    handleRemoveCar() {
        const plateNumber = this.plateInput.value.trim();
        if (!plateNumber) {
            this.showModal('Please enter a license plate number.', true);
            return;
        }

        const result = this.garage.handleDeparture(plateNumber);
        this.showModal(result.message, !result.success);
        this.plateInput.value = '';
        this.updateUI();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ParkingGarageUI();
}); 