// Owner Portal JavaScript
class OwnerPortalApp {
  constructor() {
    this.currentSection = "dashboard";
    this.tanks = this.loadTankData();
    this.uploadedPhotos = [];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderTanksGrid();
    this.setupUploadHandlers();
    this.loadDashboardData();
  }

  loadTankData() {
    return [
      {
        id: 1,
        name: "Community Tank #1",
        species: ["Red Cherry Shrimp", "Neon Tetras", "Java Moss"],
        lastUpdated: "2 hours ago",
        status: "active",
        image:
          "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop",
        views: 127,
        searches: 23,
      },
      {
        id: 2,
        name: "Guppy Breeding Tank",
        species: ["Fancy Guppies", "Endlers Guppies"],
        lastUpdated: "1 hour ago",
        status: "active",
        image:
          "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=400&h=300&fit=crop",
        views: 203,
        searches: 45,
      },
      {
        id: 3,
        name: "Angelfish Display",
        species: ["Silver Angels", "Koi Angels", "Black Angels"],
        lastUpdated: "3 hours ago",
        status: "active",
        image:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
        views: 89,
        searches: 12,
      },
      {
        id: 4,
        name: "Planted Tank Setup",
        species: ["Anubias", "Amazon Sword", "Cryptocoryne"],
        lastUpdated: "4 hours ago",
        status: "needs_update",
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
        views: 156,
        searches: 34,
      },
      {
        id: 5,
        name: "Betta Collection",
        species: ["Halfmoon Bettas", "Crowntail Bettas"],
        lastUpdated: "5 hours ago",
        status: "active",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        views: 234,
        searches: 56,
      },
      {
        id: 6,
        name: "New Tank - Empty",
        species: [],
        lastUpdated: "Never",
        status: "inactive",
        image: null,
        views: 0,
        searches: 0,
      },
    ];
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".owner-nav .nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = e.target.dataset.section;
        this.navigateToSection(section);
      });
    });

    // Quick actions
    document.querySelectorAll(".action-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleQuickAction(action);
      });
    });

    // Add tank button
    document.getElementById("addTankBtn")?.addEventListener("click", () => {
      this.showAddTankModal();
    });

    // Upload form
    document.getElementById("photoUpload")?.addEventListener("change", (e) => {
      this.handleFileSelect(e.target.files);
    });

    // Settings form
    document
      .querySelector(".settings-form")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveSettings();
      });
  }

  navigateToSection(section) {
    // Update active nav link
    document.querySelectorAll(".owner-nav .nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.section === section) {
        link.classList.add("active");
      }
    });

    // Show/hide sections
    document.querySelectorAll(".owner-section").forEach((s) => {
      s.classList.remove("active");
    });

    document.getElementById(section)?.classList.add("active");
    this.currentSection = section;

    // Load section-specific data
    if (section === "tanks") {
      this.renderTanksGrid();
    } else if (section === "dashboard") {
      this.loadDashboardData();
    }
  }

  handleQuickAction(action) {
    switch (action) {
      case "upload":
        this.navigateToSection("upload");
        break;
      case "qr":
        this.generateQRCode();
        break;
      case "update":
        this.navigateToSection("tanks");
        break;
      case "hours":
        this.navigateToSection("settings");
        break;
    }
  }

  renderTanksGrid() {
    const tanksGrid = document.getElementById("ownerTanksGrid");
    if (!tanksGrid) return;

    tanksGrid.innerHTML = this.tanks
      .map(
        (tank) => `
            <div class="owner-tank-card" data-tank-id="${tank.id}">
                <div class="tank-management-header">
                    <h3>${tank.name}</h3>
                    <div class="tank-status">
                        <span class="status-indicator ${tank.status}"></span>
                        <span>${this.getStatusText(tank.status)}</span>
                    </div>
                </div>
                <div class="tank-management-content">
                    <div class="tank-preview">
                        ${
                          tank.image
                            ? `<img src="${tank.image}" alt="${tank.name}" onerror="this.src='https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop'">`
                            : '<i class="fas fa-camera" style="font-size: 2rem; color: #a0aec0;"></i>'
                        }
                    </div>
                    <div class="tank-info">
                        <p><strong>Species:</strong> ${
                          tank.species.length
                            ? tank.species.join(", ")
                            : "No species listed"
                        }</p>
                        <p><strong>Last Updated:</strong> ${
                          tank.lastUpdated
                        }</p>
                        <p><strong>Views:</strong> ${
                          tank.views
                        } | <strong>Searches:</strong> ${tank.searches}</p>
                    </div>
                    <div class="tank-actions">
                        <button class="btn btn-primary btn-small" onclick="ownerApp.uploadToTank(${
                          tank.id
                        })">
                            <i class="fas fa-camera"></i> Upload Photo
                        </button>
                        <button class="btn btn-outline btn-small" onclick="ownerApp.editTank(${
                          tank.id
                        })">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-outline btn-small" onclick="ownerApp.generateTankQR(${
                          tank.id
                        })">
                            <i class="fas fa-qrcode"></i> QR Code
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  getStatusText(status) {
    switch (status) {
      case "active":
        return "Active";
      case "needs_update":
        return "Needs Update";
      case "inactive":
        return "Inactive";
      default:
        return "Unknown";
    }
  }

  setupUploadHandlers() {
    const dropzone = document.getElementById("uploadDropzone");
    const fileInput = document.getElementById("photoUpload");

    if (!dropzone || !fileInput) return;

    // Drag and drop handlers
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      const files = e.dataTransfer.files;
      this.handleFileSelect(files);
    });

    // Click handler
    dropzone.addEventListener("click", () => {
      fileInput.click();
    });
  }

  handleFileSelect(files) {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        this.processUploadedFile(file);
      }
    });
  }

  processUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        file: file,
        dataUrl: e.target.result,
        name: file.name,
        size: file.size,
        uploadTime: new Date().toLocaleString(),
      };

      this.uploadedPhotos.push(imageData);
      this.showUploadPreview(imageData);
      this.showSuccessMessage(`Photo "${file.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  }

  showUploadPreview(imageData) {
    const dropzone = document.getElementById("uploadDropzone");
    if (!dropzone) return;

    // Create preview element
    const preview = document.createElement("div");
    preview.className = "upload-preview";
    preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                <img src="${imageData.dataUrl}" alt="${
      imageData.name
    }" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 0.9rem;">${
                      imageData.name
                    }</h4>
                    <p style="margin: 0; font-size: 0.8rem; color: #718096;">${(
                      imageData.size / 1024
                    ).toFixed(1)} KB • ${imageData.uploadTime}</p>
                </div>
                <i class="fas fa-check-circle" style="color: #48bb78; font-size: 1.2rem;"></i>
            </div>
        `;

    dropzone.appendChild(preview);
  }

  uploadToTank(tankId) {
    const tank = this.tanks.find((t) => t.id === tankId);
    if (!tank) return;

    // Pre-populate the upload form
    this.navigateToSection("upload");

    setTimeout(() => {
      const tankSelect = document.getElementById("tankSelect");
      if (tankSelect) {
        tankSelect.value = `tank${tankId}`;
      }

      // Scroll to upload form
      document.getElementById("upload").scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  editTank(tankId) {
    const tank = this.tanks.find((t) => t.id === tankId);
    if (!tank) return;

    // Show edit modal (simplified for demo)
    const newName = prompt("Enter new tank name:", tank.name);
    if (newName && newName !== tank.name) {
      tank.name = newName;
      tank.lastUpdated = "Just now";
      this.renderTanksGrid();
      this.showSuccessMessage("Tank updated successfully!");
    }
  }

  generateTankQR(tankId) {
    const tank = this.tanks.find((t) => t.id === tankId);
    if (!tank) return;

    // Generate QR code URL (simplified - in real app, would generate actual QR code)
    const qrUrl = `https://fishmap.app/upload/${tankId}`;

    // Show QR code modal (simplified)
    alert(
      `QR Code generated for ${tank.name}\nURL: ${qrUrl}\n\nIn a real app, this would show a printable QR code.`
    );
  }

  generateQRCode() {
    this.showSuccessMessage("QR codes generated for all active tanks!");
  }

  showAddTankModal() {
    const tankName = prompt("Enter new tank name:");
    if (tankName) {
      const newTank = {
        id: this.tanks.length + 1,
        name: tankName,
        species: [],
        lastUpdated: "Just created",
        status: "inactive",
        image: null,
        views: 0,
        searches: 0,
      };

      this.tanks.push(newTank);
      this.renderTanksGrid();
      this.showSuccessMessage(`Tank "${tankName}" created successfully!`);
    }
  }

  loadDashboardData() {
    // Simulate loading dashboard stats
    this.updateDashboardStats({
      storeViews: 2847,
      activeTanks: this.tanks.filter((t) => t.status === "active").length,
      lastUpdate: "2 hours",
      speciesSearches: 156,
    });

    this.loadRecentActivity();
  }

  updateDashboardStats(stats) {
    const statCards = document.querySelectorAll(".stat-card");
    if (statCards.length >= 4) {
      statCards[0].querySelector("h3").textContent =
        stats.storeViews.toLocaleString();
      statCards[1].querySelector("h3").textContent = stats.activeTanks;
      statCards[2].querySelector("h3").textContent = stats.lastUpdate;
      statCards[3].querySelector("h3").textContent = stats.speciesSearches;
    }
  }

  loadRecentActivity() {
    const activities = [
      {
        type: "upload",
        title: "Tank photo uploaded",
        description: "Community Tank #1 - Red Cherry Shrimp",
        time: "2 hours ago",
        icon: "fas fa-camera",
      },
      {
        type: "search",
        title: 'Customer searched for "ghost shrimp"',
        description: "Your store appeared in results",
        time: "3 hours ago",
        icon: "fas fa-search",
      },
      {
        type: "update",
        title: "Tank inventory updated",
        description: "Guppy Breeding Tank - Added new arrivals",
        time: "5 hours ago",
        icon: "fas fa-edit",
      },
      {
        type: "view",
        title: "High traffic on Angelfish Display",
        description: "89 views in the last 24 hours",
        time: "6 hours ago",
        icon: "fas fa-eye",
      },
    ];

    const activityList = document.querySelector(".activity-list");
    if (activityList) {
      activityList.innerHTML = activities
        .map(
          (activity) => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <h4>${activity.title}</h4>
                        <p>${activity.description}</p>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  saveSettings() {
    // Simulate saving settings
    this.showSuccessMessage("Settings saved successfully!");
  }

  showSuccessMessage(message) {
    // Create and show success notification
    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #48bb78, #38a169); color: white; padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(72, 187, 120, 0.3); z-index: 1000; display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  showErrorMessage(message) {
    // Create and show error notification
    const notification = document.createElement("div");
    notification.className = "notification error";
    notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #f56565, #e53e3e); color: white; padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(245, 101, 101, 0.3); z-index: 1000; display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Enhanced interactions and animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the owner portal app
  window.ownerApp = new OwnerPortalApp();

  // Add loading animations
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

  // Observe cards for animation
  setTimeout(() => {
    document
      .querySelectorAll(".stat-card, .owner-tank-card, .activity-item")
      .forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease";
        observer.observe(card);
      });
  }, 100);

  // Add ripple effect to buttons
  document.querySelectorAll(".btn, .action-card").forEach((element) => {
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

  // Add hover effects for stat cards
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-4px) scale(1)";
    });
  });

  // Auto-update timestamp simulation
  setInterval(() => {
    const timeElements = document.querySelectorAll(".activity-time");
    timeElements.forEach((el) => {
      if (el.textContent.includes("hour")) {
        // Simulate time updates (simplified)
        let hours = parseInt(el.textContent);
        if (Math.random() > 0.9) {
          // 10% chance to update
          el.textContent = `${hours + 1} hours ago`;
        }
      }
    });
  }, 30000); // Update every 30 seconds

  console.log(
    "🐠 Owner Portal Initialized! Ready to manage your aquarium inventory."
  );
});

// Add styles for notifications
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .status-indicator.active {
        background: #48bb78;
    }
    
    .status-indicator.needs_update {
        background: #ed8936;
    }
    
    .status-indicator.inactive {
        background: #a0aec0;
    }
`;
document.head.appendChild(notificationStyles);
