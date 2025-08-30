// FishMap Application JavaScript
class FishMapApp {
  constructor() {
    this.currentPage = "map";
    this.selectedStore = null;
    this.stores = this.initializeStores();
    this.tanks = this.initializeTanks();
    this.filters = {
      species: [],
      distance: "all",
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderTankGrid();
    this.setupSearch();
  }

  initializeStores() {
    return {
      terrys: {
        id: "terrys",
        name: "Terry's Aquatics",
        address: "123 Aquarium St, Hobart, IN 46342",
        phone: "(219) 555-0123",
        hours: "Open today: 10:00 AM - 8:00 PM",
        distance: "2.3 miles",
        lastUpdated: "2 hours ago",
        tags: ["Freshwater", "Saltwater", "Plants"],
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80",
        coordinates: [41.5322, -87.2553], // Hobart, IN area
      },
      aquaworld: {
        id: "aquaworld",
        name: "AquaWorld",
        address: "456 Fish Lane, Gary, IN 46408",
        phone: "(219) 555-0456",
        hours: "Open today: 9:00 AM - 9:00 PM",
        distance: "3.7 miles",
        lastUpdated: "4 hours ago",
        tags: ["Tropical Fish", "Shrimp"],
        image: "https://images.unsplash.com/photo-1563281746-b9d6c6c752e9?w=400&h=300&fit=crop&q=80",
        coordinates: [41.5936, -87.3464], // Gary, IN area
      },
      fishparadise: {
        id: "fishparadise",
        name: "Fish Paradise",
        address: "789 Coral Reef Dr, Hammond, IN 46320",
        phone: "(219) 555-0789",
        hours: "Open today: 11:00 AM - 7:00 PM",
        distance: "4.1 miles",
        lastUpdated: "1 hour ago",
        tags: ["Cichlids", "Bettas", "Supplies"],
        image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop&q=80",
        coordinates: [41.5831, -87.5000], // Hammond, IN area
      },
      reefstation: {
        id: "reefstation",
        name: "Reef Station",
        address: "321 Marine Way, East Chicago, IN 46312",
        phone: "(219) 555-0321",
        hours: "Open today: 10:00 AM - 6:00 PM",
        distance: "5.2 miles",
        lastUpdated: "30 minutes ago",
        tags: ["Marine", "Corals", "Invertebrates"],
        image: "https://images.unsplash.com/photo-1545450660-ca0c014745ca?w=400&h=300&fit=crop&q=80",
        coordinates: [41.6389, -87.4548], // East Chicago, IN area
      },
        phone: "(219) 555-0789",
        hours: "Open today: 11:00 AM - 7:00 PM",
        distance: "4.1 miles",
        lastUpdated: "1 hour ago",
        tags: ["Cichlids", "Bettas", "Supplies"],
        image:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
      },
      reefstation: {
        id: "reefstation",
        name: "Reef Station",
        address: "321 Marine Way, East Chicago, IN 46312",
        phone: "(219) 555-0321",
        hours: "Open today: 10:00 AM - 6:00 PM",
        distance: "5.2 miles",
        lastUpdated: "30 minutes ago",
        tags: ["Marine", "Corals", "Invertebrates"],
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
      },
    };
  }

  initializeTanks() {
    return {
      terrys: [
        {
          id: 1,
          name: "Community Tank #1",
          species: ["Red Cherry Shrimp", "Neon Tetras", "Java Moss"],
          category: "shrimp",
          image:
            "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop",
          timestamp: "Updated today, 2:15 PM",
          description:
            "Beautiful community tank with healthy shrimp colony and schooling tetras. Well-established with live plants.",
        },
        {
          id: 2,
          name: "Guppy Breeding Tank",
          species: ["Fancy Guppies", "Endlers Guppies"],
          category: "guppies",
          image:
            "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=400&h=300&fit=crop",
          timestamp: "Updated today, 1:45 PM",
          description:
            "Premium guppy strains including Moscow blues, red deltas, and rare endlers. Breeding quality fish.",
        },
        {
          id: 3,
          name: "Angelfish Display",
          species: ["Silver Angels", "Koi Angels", "Black Angels"],
          category: "cichlids",
          image:
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
          timestamp: "Updated today, 12:30 PM",
          description:
            "Stunning angelfish in various color patterns. Hand-picked specimens with excellent finnage.",
        },
        {
          id: 4,
          name: "Planted Tank Setup",
          species: ["Anubias", "Amazon Sword", "Cryptocoryne"],
          category: "plants",
          image:
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
          timestamp: "Updated today, 11:20 AM",
          description:
            "Fully aquascaped planted tank with CO2 injection. Perfect for plant enthusiasts.",
        },
        {
          id: 5,
          name: "Betta Collection",
          species: ["Halfmoon Bettas", "Crowntail Bettas", "Plakat Bettas"],
          category: "bettas",
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
          timestamp: "Updated today, 10:45 AM",
          description:
            "Premium betta fish in various tail types and colors. Each fish individually housed.",
        },
        {
          id: 6,
          name: "Ghost Shrimp Tank",
          species: ["Ghost Shrimp", "Amano Shrimp"],
          category: "shrimp",
          image:
            "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=400&h=300&fit=crop",
          timestamp: "Updated today, 9:30 AM",
          description:
            "Healthy ghost shrimp and amano shrimp for algae control and tank cleaning.",
        },
      ],
      aquaworld: [
        {
          id: 7,
          name: "Crystal Shrimp Paradise",
          species: ["Crystal Red Shrimp", "Crystal Black Shrimp"],
          category: "shrimp",
          image:
            "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
          timestamp: "Updated today, 3:20 PM",
          description:
            "High-grade crystal shrimp with excellent color and patterns. Bred in soft water conditions.",
        },
        {
          id: 8,
          name: "Tetra School",
          species: ["Cardinal Tetras", "Rummy Nose Tetras", "Ember Tetras"],
          category: "tetras",
          image:
            "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop",
          timestamp: "Updated today, 2:50 PM",
          description:
            "Beautiful schooling tetras in large groups. Perfect for community aquariums.",
        },
      ],
      fishparadise: [
        {
          id: 9,
          name: "African Cichlid Paradise",
          species: ["Electric Yellow", "Red Zebra", "Blue Johanni"],
          category: "cichlids",
          image:
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
          timestamp: "Updated today, 4:10 PM",
          description:
            "Vibrant African cichlids from Lake Malawi. Excellent colors and healthy specimens.",
        },
        {
          id: 10,
          name: "Betta Showcase",
          species: ["Galaxy Koi Bettas", "Dumbo Ear Bettas"],
          category: "bettas",
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
          timestamp: "Updated today, 3:45 PM",
          description:
            "Rare and exotic betta varieties including galaxy koi and dumbo ear patterns.",
        },
      ],
      reefstation: [
        {
          id: 11,
          name: "Coral Garden",
          species: ["Zoanthids", "Mushroom Corals", "GSP"],
          category: "corals",
          image:
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
          timestamp: "Updated today, 1:20 PM",
          description:
            "Thriving coral frags under optimal lighting. Perfect for reef tank enthusiasts.",
        },
        {
          id: 12,
          name: "Marine Fish Collection",
          species: ["Clownfish", "Yellow Tang", "Royal Gramma"],
          category: "marine",
          image:
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
          timestamp: "Updated today, 12:45 PM",
          description:
            "Healthy marine fish acclimated and eating well. Quarantined and ready for home aquariums.",
        },
      ],
    };
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        this.navigateToPage(page);
      });
    });

    // Store cards and map pins
    document.querySelectorAll(".store-card, .map-pin").forEach((element) => {
      element.addEventListener("click", (e) => {
        const storeId = e.currentTarget.dataset.store;
        this.openStoreDetail(storeId);
      });
    });

    // Back button
    document.getElementById("backBtn").addEventListener("click", () => {
      this.navigateToPage("map");
    });

    // Filter button
    document.getElementById("filterBtn").addEventListener("click", () => {
      const panel = document.getElementById("filterPanel");
      panel.classList.toggle("active");
    });

    // Tank filters
    document.querySelectorAll(".filter-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        document
          .querySelectorAll(".filter-tag")
          .forEach((t) => t.classList.remove("active"));
        e.target.classList.add("active");
        const filter = e.target.dataset.filter;
        this.filterTanks(filter);
      });
    });

    // Search functionality
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });

    // Filter checkboxes
    document
      .querySelectorAll('#filterPanel input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          this.updateFilters();
        });
      });

    // Distance filter
    document.getElementById("distanceFilter").addEventListener("change", () => {
      this.updateFilters();
    });

    // Close filter panel when clicking outside
    document.addEventListener("click", (e) => {
      const panel = document.getElementById("filterPanel");
      const filterBtn = document.getElementById("filterBtn");
      if (!panel.contains(e.target) && !filterBtn.contains(e.target)) {
        panel.classList.remove("active");
      }
    });
  }

  navigateToPage(page) {
    // Update active nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.page === page) {
        link.classList.add("active");
      }
    });

    // Show/hide pages
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("active");
    });

    if (page === "map") {
      document.getElementById("mapPage").classList.add("active");
    } else if (page === "stores") {
      document.getElementById("storeDetailPage").classList.add("active");
    }

    this.currentPage = page;
  }

  openStoreDetail(storeId) {
    this.selectedStore = storeId;
    const store = this.stores[storeId];

    // Update store header
    document.getElementById("storeTitle").textContent = store.name;
    document.querySelector(".store-meta").innerHTML = `
            <p><i class="fas fa-map-marker-alt"></i> ${store.address}</p>
            <p><i class="fas fa-phone"></i> ${store.phone}</p>
            <p><i class="fas fa-clock"></i> ${store.hours}</p>
        `;

    // Render tanks for this store
    this.renderTankGrid(storeId);

    // Navigate to store detail page
    document.getElementById("mapPage").classList.remove("active");
    document.getElementById("storeDetailPage").classList.add("active");
  }

  renderTankGrid(storeId = null) {
    const tankGrid = document.getElementById("tankGrid");
    let tanksToShow = [];

    if (storeId && this.tanks[storeId]) {
      tanksToShow = this.tanks[storeId];
    } else if (this.selectedStore && this.tanks[this.selectedStore]) {
      tanksToShow = this.tanks[this.selectedStore];
    } else {
      // Show all tanks from all stores
      Object.values(this.tanks).forEach((storeTanks) => {
        tanksToShow = tanksToShow.concat(storeTanks);
      });
    }

    tankGrid.innerHTML = tanksToShow
      .map(
        (tank) => `
            <div class="tank-card" data-category="${tank.category}">
                <div class="tank-image">
                    <img src="${tank.image}" alt="${
          tank.name
        }" onerror="this.src='https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop'">
                    <div class="tank-timestamp">${tank.timestamp}</div>
                </div>
                <div class="tank-info">
                    <h4>${tank.name}</h4>
                    <div class="tank-species">
                        ${tank.species
                          .map(
                            (species) =>
                              `<span class="species-tag">${species}</span>`
                          )
                          .join("")}
                    </div>
                    <div class="tank-details">${tank.description}</div>
                </div>
            </div>
        `
      )
      .join("");
  }

  filterTanks(category) {
    const tankCards = document.querySelectorAll(".tank-card");

    tankCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  handleSearch(searchTerm) {
    if (!searchTerm.trim()) {
      this.clearSearchHighlights();
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    // Search in stores
    document.querySelectorAll(".store-card").forEach((card) => {
      const storeName = card.querySelector("h4").textContent.toLowerCase();
      const storeTags = Array.from(card.querySelectorAll(".tag")).map((tag) =>
        tag.textContent.toLowerCase()
      );

      if (
        storeName.includes(searchLower) ||
        storeTags.some((tag) => tag.includes(searchLower))
      ) {
        card.style.display = "flex";
        this.highlightSearchTerm(card, searchTerm);
      } else {
        card.style.display = "none";
      }
    });

    // Search in map pins
    document.querySelectorAll(".map-pin").forEach((pin) => {
      const storeId = pin.dataset.store;
      const store = this.stores[storeId];
      const storeName = store.name.toLowerCase();
      const storeTags = store.tags.map((tag) => tag.toLowerCase());

      if (
        storeName.includes(searchLower) ||
        storeTags.some((tag) => tag.includes(searchLower))
      ) {
        pin.style.display = "block";
      } else {
        pin.style.display = "none";
      }
    });

    // Search in tanks
    if (
      this.currentPage === "stores" ||
      document.getElementById("storeDetailPage").classList.contains("active")
    ) {
      document.querySelectorAll(".tank-card").forEach((card) => {
        const tankName = card.querySelector("h4").textContent.toLowerCase();
        const species = Array.from(card.querySelectorAll(".species-tag")).map(
          (tag) => tag.textContent.toLowerCase()
        );
        const description = card
          .querySelector(".tank-details")
          .textContent.toLowerCase();

        if (
          tankName.includes(searchLower) ||
          species.some((s) => s.includes(searchLower)) ||
          description.includes(searchLower)
        ) {
          card.style.display = "block";
          this.highlightSearchTerm(card, searchTerm);
        } else {
          card.style.display = "none";
        }
      });
    }
  }

  highlightSearchTerm(element, term) {
    // Simple highlighting - in a real app, you'd want more sophisticated highlighting
    const textElements = element.querySelectorAll("h4, .tank-details, .tag");
    textElements.forEach((el) => {
      const originalText = el.textContent;
      const regex = new RegExp(`(${term})`, "gi");
      if (regex.test(originalText)) {
        el.innerHTML = originalText.replace(regex, "<mark>$1</mark>");
      }
    });
  }

  clearSearchHighlights() {
    document.querySelectorAll("mark").forEach((mark) => {
      mark.outerHTML = mark.innerHTML;
    });

    // Show all elements
    document
      .querySelectorAll(".store-card, .map-pin, .tank-card")
      .forEach((el) => {
        el.style.display = "";
      });
  }

  updateFilters() {
    const checkedFilters = Array.from(
      document.querySelectorAll('#filterPanel input[type="checkbox"]:checked')
    ).map((input) => input.value);
    const distanceFilter = document.getElementById("distanceFilter").value;

    this.filters.species = checkedFilters;
    this.filters.distance = distanceFilter;

    this.applyFilters();
  }

  applyFilters() {
    // Filter stores based on selected criteria
    document.querySelectorAll(".store-card").forEach((card) => {
      let shouldShow = true;

      // Species filter
      if (this.filters.species.length > 0) {
        const storeTags = Array.from(card.querySelectorAll(".tag")).map((tag) =>
          tag.textContent.toLowerCase()
        );
        const hasMatchingSpecies = this.filters.species.some((species) =>
          storeTags.some((tag) => tag.includes(species))
        );
        if (!hasMatchingSpecies) shouldShow = false;
      }

      // Distance filter
      if (this.filters.distance !== "all") {
        const distance = parseFloat(
          card.querySelector(".distance").textContent
        );
        const maxDistance = parseFloat(this.filters.distance);
        if (distance > maxDistance) shouldShow = false;
      }

      card.style.display = shouldShow ? "flex" : "none";
    });

    // Also filter map pins
    document.querySelectorAll(".map-pin").forEach((pin) => {
      const storeCard = document.querySelector(
        `.store-card[data-store="${pin.dataset.store}"]`
      );
      pin.style.display = storeCard.style.display === "none" ? "none" : "block";
    });
  }

  setupSearch() {
    // Add some sample search suggestions
    const searchInput = document.getElementById("searchInput");
    const suggestions = [
      "guppies",
      "angelfish",
      "ghost shrimp",
      "tetras",
      "bettas",
      "cichlids",
      "plants",
      "corals",
      "marine fish",
      "freshwater",
    ];

    // Simple autocomplete functionality
    searchInput.addEventListener("focus", () => {
      // In a real app, you'd implement a proper autocomplete dropdown
      searchInput.placeholder = `Try: ${
        suggestions[Math.floor(Math.random() * suggestions.length)]
      }`;
    });

    searchInput.addEventListener("blur", () => {
      searchInput.placeholder =
        "Search for guppies, angelfish, ghost shrimp...";
    });
  }
}

// Enhanced animations and interactions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the app
  const app = new FishMapApp();

  // Add some nice loading animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  setTimeout(() => {
    document.querySelectorAll(".store-card, .tank-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.6s ease";
      observer.observe(card);
    });
  }, 100);

  // Add ripple effect to buttons
  document
    .querySelectorAll(".btn, .filter-tag, .store-card")
    .forEach((element) => {
      element.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Enhanced map pin interactions
  document.querySelectorAll(".map-pin").forEach((pin) => {
    pin.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.zIndex = "1000";
    });

    pin.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.zIndex = "10";
    });
  });

  // Add loading states for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.addEventListener("error", function () {
      this.style.opacity = "0.7";
      this.style.filter = "grayscale(100%)";
    });

    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
  });

  console.log(
    "🐠 FishMap App Initialized! Welcome to the future of aquarium shopping."
  );
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    mark {
        background: linear-gradient(135deg, #fef5e7, #fed7aa);
        color: #c05621;
        padding: 0.1em 0.2em;
        border-radius: 3px;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
