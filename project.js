
const form = document.getElementById("car-form");
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const urlElement = document.getElementById('url');
const cardbody = document.getElementsByClassName("card-body")[1];
const clear = document.getElementById("clear-cars");

const ui = new UI();

const storage = new Storage();

eventListener();

function eventListener() {
    form.addEventListener("submit", addCar);

    document.addEventListener("DOMContentLoaded", function () {
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });

    cardbody.addEventListener("click", deleteCar);
    clear.addEventListener("click", clearAllCars);
}

function addCar() {

    
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if (title === "" || price === "" || url === "") {
        ui.displayMessages("Tüm alanları doldurunuz...", "danger");
    }
    else {

        const newCar = new Car(title, price, url);

        ui.addCarToUI(newCar);

        storage.addCarToStorage(newCar);

        ui.displayMessages("Araç başarıyla eklendi...", "success");
    }
    ui.clearInputs(titleElement, urlElement, priceElement);
}

function deleteCar(e) {

    if (e.target.id === "delete-car") {
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)

        ui.displayMessages("Silme işlemi başarıyla gerçekleşti", "success");
    }
}

function clearAllCars() {
    if (confirm("Tüm araçlar silinecek. Emin misiniz?")) {
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }
}
