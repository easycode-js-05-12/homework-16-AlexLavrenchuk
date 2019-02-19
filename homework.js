// -------------------------- Home work 16 ----------------------- //
// -------------------------- Alex Lavrenchuk -------------------- //

// 1.  Есть класс Planet
//
//     function Planet(name) {
//          this.name = name;
//
//          this.getName = function () {
//              return 'Planet name is ' + this.name;
//          }
//     }
//
//     Создать наследника от Planet, который будет называться PlanetWithSatellite и будет
//     принимать, кроме name, название спутника (satelliteName). Переопределите метод
//     getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку +
//     дополнительный текст 'The satellite is' + satelliteName.
//     Например:
//
//     var earth = new PlanetWithSatellite('earth', 'moon');
//     earth.getName(); // 'Planet name is earth. The satellite is moon’

/**
 * @docs class Planet, sets the name and output method
 * @param {string} name 
 */
function Planet(name) {
    this.name = name;

    this.getName = function () {
        return 'Planet name is ' + this.name;
    }
}

PlanetWithSatellite.prototype = Object.create(Planet.prototype);
PlanetWithSatellite.prototype.constructor = PlanetWithSatellite;

/**
 * @docs class PlanetWithSatellite child of class Planet, sets the name and output method with the parent name
 * @param {string} name 
 * @param {string} satelliteName 
 */
function PlanetWithSatellite(name, satelliteName) {
    Planet.call(this, name);
    this.satelliteName = satelliteName;

    const parentMethod = this.getName();

    this.getName = function () {
        return parentMethod + ". The satellite is " + this.satelliteName;
    }
}

const earth = new PlanetWithSatellite('earth', 'moon');


//===================================

// 2.  Создайте класс “Здание” (пусть у него будет имя, количество этажей, метод “получить количество
//     этажей” и метод “установить количество этажей”).
//     Создайте наследников этого класса:
//     классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование
//     У жилого дома появится свойство “количество квартир на этаже”, а метод “получить количество
//     этажей” должен вернуть объект вида {этажи: 5, всегоКвартир: 5 * количествоКвартир}
//     У торгового центра появится свойство “количество магазинов на этаже”, а метод “получить
//     количество этажей” должен вернуть объект вида {этажи: 3, всегоМагазинов: 3 *
//     количествоМагазинов}
//     От каждого класса создать экземпляр (дом, торговый центр)

/**
 * @docs class Building, sets the name and number of floors, also methods for floors
 * @param {string} name 
 * @param {number} floors 
 */
function Building(name, floors) {
    this.name = name;
    this.floors = floors || 0;

    this.getFloors = function () {
        return this.floors;
    }

    this.setFloors = function (newFloors) {
        return this.floors = newFloors;
    }
}

/**
 * @docs class House child of class Building, sets the name, number of floors and apartments on the floor, also methods for apartments
 * @param {string} name 
 * @param {number} floors 
 * @param {number} apartment 
 */
function House(name, floors, apartment) {
    Building.call(this, name, floors);
    this.floors = this.getFloors();
    this.apartment = apartment || 0;

    this.getApartment = function () {
        return this.apartment;
    }

    this.setApartment =function (newApartment) {
        return this.apartment = newApartment;
    }

    this.getFloors = function () {
        return {
            floors: this.floors,
            allApartment: this.floors * this.apartment
        };
    }
}

/**
 * @docs class ShoppingCenter child of class Building, sets the name, number of floors and shops on the floorб also methods for shops
 * @param {string} name 
 * @param {number} floors 
 * @param {number} shop 
 */
function ShoppingCenter(name, floors, shop) {
    Building.call(this, name, floors);
    this.floors = this.getFloors();
    this.shop = shop || 0;

    this.getShop = function () {
        return this.shop;
    }

    this.setShop = function (newShop) {
        return this.shop = newShop
    }

    this.getFloors = function () {
        return {
            floors: this.floors,
            allShop: this.floors * this.shop
        };
    }
}

const house = new House('Julstroy');
const shoppingCenter = new ShoppingCenter('Rost');

//====================================


// 3.  Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом “получить информацию”
//     (метод должен вывести имя и цену). Метод должен быть объявлен с помощью прототипов
//     (Func.prototype...). Создать два экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и
//     “Мебель для дома”. Придумайте им по одному свойству, которые будут характерны только для этих
//     экземпляров (например, для офисной мебели - наличие компьютерного стола или шредера). Метод
//     “получить информацию” должен учитывать и добавленное вами новое свойство.
//     Задача на переопределение метода у экземпляров класса.

/**
 * @docs class Furniture, sets the name, price and method for obtaining information
 * @param {string} name 
 * @param {number} price 
 */
function Furniture(name, price) {
    this.name = name;
    this.price = price;
}

Furniture.prototype.getInfo = function () {
    return 'Name: ' + this.name + ", " + "price: " + this.price + "$";
}

const sofa = new Furniture('sofa', 100);

/**
 * @docs class OfficeFurniture child of class Furniture, determines the length parameter and adds to the output method, also adds methods to manage the new parameter.
 * @param {string} name 
 * @param {number} price 
 * @param {number} length 
 */
function OfficeFurniture(name, price, length) {
    Furniture.call(this, name, price);
    this.length = length || "no length";
}

OfficeFurniture.prototype = Object.create(Furniture.prototype);
OfficeFurniture.prototype.constructor = OfficeFurniture;

OfficeFurniture.prototype.getLength = function () {
    return this.length;
}
OfficeFurniture.prototype.setLength = function (newLength) {
    return this.length = newLength;
}
OfficeFurniture.prototype.getInfo = function () {
    return Furniture.prototype.getInfo.call(this) + ", " + "length: " + this.length;
}

const office = new OfficeFurniture("table", 120);

/**
 * @docs class HomeFurniture child of class Furniture, determines the material parameter and adds to the information output method, also adds methods to manage the new parameter.
 * @param {string} name 
 * @param {number} price 
 * @param {string} material
 */
function HomeFurniture(name, price, material) {
    Furniture.call(this, name, price);
    this.material = material || 'no material';
}

HomeFurniture.prototype = Object.create(Furniture.prototype);
HomeFurniture.prototype.constructor = HomeFurniture;

HomeFurniture.prototype.getMaterial = function () {
    return this.material;
}
HomeFurniture.prototype.setMaterial = function (newMaterial) {
    return this.material = newMaterial;
}
HomeFurniture.prototype.getInfo = function () {
    return Furniture.prototype.getInfo.call(this) + ", " + "material: " + this.material;
}

const home = new HomeFurniture("cupboard", 1500);

//=======================================

// 4.  Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и методом
//     “получить информацию” (метод должен вывести имя и дату регистрации). Метод должен быть
//     объявлен с помощью прототипов (Func.prototype...) Создать два наследника класса “Пользователь”:
//     класс “Админ” и класс “Гость”.
//     У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть
//     true/false, должно быть скрытым). Свойства определяются в момент вызова
//     конструктора.
//     У класса “Гость” должно быть свойство “срокДействия” (validDate, например), содержащее дату
//     (например, одну неделю от момента регистрации).
//     У классов-наследников метод “получить информацию” должен так же содержать информацию о
//     дополнительных свойствах (“суперАдмин” и “срокДействия”)

/**
 * @docs class User, fixes user registration
 * @param {string} name 
 */
function User(name) {
    this.name = name;
    this.dateOfRegistration = new Date();
}

User.prototype.getInfo = function () {
    return `Name: ${this.name}, date: ${this.dateOfRegistration.toLocaleString()}`;
}

const user = new User('Alex');


/**
 * @docs class Admin child of class User, additionally sets the status
 * @param {string} name 
 * @param {Boolean} secret 
 */
function Admin(name, secret) {
    User.call(this, name);
    superAdmin = Symbol();
    this[superAdmin] = secret || false; 
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.getInfo = function () {
    return User.prototype.getInfo.call(this) + " " + this[superAdmin];
}

const admin = new Admin("Alex", true);


/**
 * @docs class Guest child of class User, additionally sets the validDate plus seven days
 * @param {string} name 
 */
function Guest(name) {
    User.call(this, name);
    
    this.validDate = new Date();    
    this.validDate.setDate(this.dateOfRegistration.getDate() + 7);
}

Guest.prototype.getInfo = function () {
    return User.prototype.getInfo.call(this) + ", validDate: " + this.validDate.toLocaleString();
}

const guest = new Guest('Olecksii');
