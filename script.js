// Dados dos carros
const cars = [
    {
        id: 1,
        name: 'Toyota AE86 Trueno',
        driver: 'Takumi Fujiwara',
        team: 'Project D',
        image: 'trueno.jpg',
        specs: { power: '130hp', torque: '149 Nm', weight: '970kg' },
        description: 'The legendary Hachi-Roku that started it all. Takumi\'s precision and the AE86\'s perfect weight distribution create an unstoppable combination on the mountain passes.'
    },
    {
        id: 2,
        name: 'Mazda RX-7 FD3S',
        driver: 'Keisuke Takahashi',
        team: 'Project D',
        image: 'mazda.png',
        specs: { power: '280hp', torque: '294 Nm', weight: '1270kg' },
        description: 'The rotary-powered beast with its distinctive sound. Keisuke\'s aggressive driving style perfectly matches the RX-7\'s raw power and handling.'
    },
    {
        id: 3,
        name: 'Nissan Skyline GT-R R32',
        driver: 'Nakazato',
        team: 'Myogi Night Kids',
        image: 'r32.jpg',
        specs: { power: '280hp', torque: '353 Nm', weight: '1540kg' },
        description: 'The legendary Godzilla with its advanced AWD system. Pure Japanese engineering excellence designed to dominate both street and track.'
    },
    {
        id: 4,
        name: 'Nissan Silvia S13',
        driver: 'Mako & Sayuki',
        team: 'Impact Blue',
        image: 's13.jpg',
        specs: { power: '205hp', torque: '275 Nm', weight: '1200kg' },
        description: 'The drift machine of Impact Blue. Perfect balance and rear-wheel drive make it ideal for the technical corners of Usui Pass.'
    }
];

// Dados dos pilotos
const drivers = [
    {
        name: 'Takumi Fujiwara',
        team: 'Project D',
        car: 'Toyota AE86',
        specialty: 'Downhill Specialist',
        wins: '∞',
        image: 'fujiwara.png'
    },
    {
        name: 'Keisuke Takahashi',
        team: 'Project D',
        car: 'Mazda RX-7 FD',
        specialty: 'Uphill Master',
        wins: '47',
        image: 'ryosuke.jpg'
    },
    {
        name: 'Ryosuke Takahashi',
        team: 'Project D Leader',
        car: 'Mazda RX-7 FC',
        specialty: 'Strategic Genius',
        wins: '∞',
        image: 'ryo.jpg'
    }
];

// Estado da aplicação
let currentCarIndex = 0;
let isMenuOpen = false;
let autoSlideInterval;

// Elementos DOM
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const heroBg = document.getElementById('hero-bg');
const prevCarBtn = document.getElementById('prev-car');
const nextCarBtn = document.getElementById('next-car');
const carIndicators = document.getElementById('car-indicators');
const carsGrid = document.getElementById('cars-grid');
const driversGrid = document.getElementById('drivers-grid');

// Elementos de informações do carro atual
const currentCarName = document.getElementById('current-car-name');
const currentCarDriver = document.getElementById('current-car-driver');
const currentCarDescription = document.getElementById('current-car-description');
const currentCarPower = document.getElementById('current-car-power');
const currentCarTorque = document.getElementById('current-car-torque');
const currentCarWeight = document.getElementById('current-car-weight');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    generateCarIndicators();
    generateCarsGrid();
    generateDriversGrid();
    updateCurrentCar();
    startAutoSlide();
}

function setupEventListeners() {
    // Scroll event para navbar
    window.addEventListener('scroll', handleScroll);
    
    // Menu mobile
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navegação do carrossel
    prevCarBtn.addEventListener('click', previousCar);
    nextCarBtn.addEventListener('click', nextCar);
    
    // Links de navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Fechar menu mobile se estiver aberto
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
}

function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = 'transparent';
    }
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function generateCarIndicators() {
    carIndicators.innerHTML = '';
    cars.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'car-indicator';
        indicator.addEventListener('click', () => setCurrentCar(index));
        carIndicators.appendChild(indicator);
    });
}

function generateCarsGrid() {
    carsGrid.innerHTML = '';
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card group';
        carCard.innerHTML = `
            <div class="relative overflow-hidden">
                <img 
                    src="${car.image}" 
                    alt="${car.name}"
                    class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 gradient-overlay"></div>
                <div class="absolute bottom-4 left-4">
                    <div class="text-cyan-400 font-semibold">${car.team}</div>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-2 text-red-500">${car.name}</h3>
                <p class="text-lg text-gray-300 mb-4">Piloted by ${car.driver}</p>
                <p class="text-gray-400 mb-6">${car.description}</p>
                
                <div class="flex justify-between">
                    <div class="text-center">
                        <div class="text-lg font-bold text-cyan-400">${car.specs.power}</div>
                        <div class="text-xs text-gray-500">POWER</div>
                    </div>
                    <div class="text-center">
                        <div class="text-lg font-bold text-cyan-400">${car.specs.torque}</div>
                        <div class="text-xs text-gray-500">TORQUE</div>
                    </div>
                    <div class="text-center">
                        <div class="text-lg font-bold text-cyan-400">${car.specs.weight}</div>
                        <div class="text-xs text-gray-500">WEIGHT</div>
                    </div>
                </div>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });
}

function generateDriversGrid() {
    driversGrid.innerHTML = '';
    drivers.forEach(driver => {
        const driverCard = document.createElement('div');
        driverCard.className = 'driver-card group';
        driverCard.innerHTML = `
            <div class="relative mb-6">
                <img 
                    src="${driver.image}" 
                    alt="${driver.name}"
                    class="driver-image group-hover:ring-red-500"
                />
            </div>
            <h3 class="text-2xl font-bold mb-2 text-red-500">${driver.name}</h3>
            <p class="text-gray-300 mb-1">${driver.team}</p>
            <p class="text-gray-400 mb-2">${driver.car}</p>
            <p class="text-cyan-400 mb-2">${driver.specialty}</p>
            <div class="text-center">
                <div class="text-3xl font-bold text-white">${driver.wins}</div>
                <div class="text-sm text-gray-500">VICTORIES</div>
            </div>
        `;
        driversGrid.appendChild(driverCard);
    });
}

function updateCurrentCar() {
    const car = cars[currentCarIndex];
    
    // Atualizar background
    heroBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${car.image})`;
    
    // Atualizar informações
    currentCarName.textContent = car.name;
    currentCarDriver.textContent = `Driven by ${car.driver}`;
    currentCarDescription.textContent = car.description;
    currentCarPower.textContent = car.specs.power;
    currentCarTorque.textContent = car.specs.torque;
    currentCarWeight.textContent = car.specs.weight;
    
    // Atualizar indicadores
    const indicators = carIndicators.querySelectorAll('.car-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentCarIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function setCurrentCar(index) {
    currentCarIndex = index;
    updateCurrentCar();
    resetAutoSlide();
}

function nextCar() {
    currentCarIndex = (currentCarIndex + 1) % cars.length;
    updateCurrentCar();
    resetAutoSlide();
}

function previousCar() {
    currentCarIndex = (currentCarIndex - 1 + cars.length) % cars.length;
    updateCurrentCar();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextCar();
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Pausar auto-slide quando o mouse estiver sobre o hero
document.querySelector('section').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('section').addEventListener('mouseleave', () => {
    startAutoSlide();
});