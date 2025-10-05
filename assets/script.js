// IMMEDIATE scroll to top - prevent any scroll restoration before DOM is ready
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  
  // Theme Management
  class ThemeManager {
    constructor() {
      this.particlesInitialized = false;
      this.init();
    }
  
    init() {
      // Load saved theme or detect system preference
      const savedTheme =
        localStorage.getItem("theme") || this.getSystemPreference();
      this.setTheme(savedTheme);
  
      // Only initialize particles if not already done and we have the function
      if (
        !this.particlesInitialized &&
        window.initializeParticles &&
        document.getElementById("particles-js")
      ) {
        initializeParticles();
        this.particlesInitialized = true;
      }
  
      // Set up theme toggle button
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", () => this.toggleTheme());
      }
  
      // Listen for system theme changes (only if no saved preference)
      this.setupSystemThemeListener();
    }
  
    getSystemPreference() {
      // Check if the browser supports prefers-color-scheme
      if (window.matchMedia) {
        // Check if user prefers dark mode
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }
        // Check if user prefers light mode
        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          return "light";
        }
      }
  
      // Fallback to light mode if system preference can't be detected
      return "light";
    }
  
    setupSystemThemeListener() {
      // Only listen for system changes if user hasn't explicitly set a preference
      if (!localStorage.getItem("theme") && window.matchMedia) {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
        // Listen for changes in system preference
        darkModeQuery.addEventListener("change", (e) => {
          // Only auto-update if user hasn't set a manual preference
          if (!localStorage.getItem("theme")) {
            const newTheme = e.matches ? "dark" : "light";
            this.setTheme(newTheme);
  
            // Reinitialize particles with new theme if they exist
            if (document.getElementById("particles-js")) {
              if (window.reinitializeParticles) {
                reinitializeParticles();
              } else {
                this.fallbackThemeSwitch(newTheme);
              }
            }
          }
        });
      }
    }
  
    setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
  
      // Update toggle button icon
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.textContent = theme === "light" ? "☾" : "☀";
      }
    }
  
    toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      this.setTheme(newTheme);
  
      // Reinitialize particles with new theme if they exist
      if (document.getElementById("particles-js")) {
        if (window.reinitializeParticles) {
          reinitializeParticles();
        } else {
          // Fallback for theme switching
          this.fallbackThemeSwitch(newTheme);
        }
      }
    }
  
    fallbackThemeSwitch(theme) {
      // If reinitializeParticles is not available, try to update existing particles
      if (window.pJSDom && window.pJSDom.length > 0) {
        const colors =
          theme === "light"
            ? { particles: "#333333", lines: "#333333" }
            : { particles: "#ffffff", lines: "#ffffff" };
  
        try {
          window.pJSDom[0].pJS.particles.color.value = colors.particles;
          window.pJSDom[0].pJS.particles.line_linked.color = colors.lines;
          window.pJSDom[0].pJS.fn.particlesRefresh();
        } catch (e) {
          console.log("Could not update particle colors:", e);
        }
      }
    }
  }
  
  // Animation Management for Details Page
  class AnimationManager {
    constructor() {
      this.detailsSection = document.getElementById("details-section");
      if (this.detailsSection) {
        this.initAnimations();
      }
    }
  
    initAnimations() {
      // Reset all animations first
      this.resetAnimations();
  
      // Start animations after a brief delay to ensure DOM is ready
      setTimeout(() => {
        this.triggerAnimations();
      }, 50);
    }
  
    resetAnimations() {
      // Remove all animation classes
      const sections = document.querySelectorAll("#details-section section");
      const headings = document.querySelectorAll("#details-section h2");
      const listItems = document.querySelectorAll("#details-section li");
      const profileImage = document.getElementById("profile-image");
      const profileName = document.getElementById("profile-name");
      const profileTitle = document.getElementById("profile-title");
      const aboutText = document.getElementById("about-text");
      const educationSection = document.getElementById("education-section");
      const researchSection = document.getElementById("research-section");
      const profileLinks = document.getElementById("profile-links");
      const servicesContent = document.getElementById("services-content");
  
      [sections, headings, listItems].forEach((nodeList) => {
        nodeList.forEach((element) => {
          element.classList.remove("animate-in");
          element.style.animation = "none";
          // Force reflow
          element.offsetHeight;
          element.style.animation = "";
        });
      });
  
      [
        profileImage,
        profileName,
        profileTitle,
        aboutText,
        educationSection,
        researchSection,
        profileLinks,
        servicesContent,
      ].forEach((element) => {
        if (element) {
          element.classList.remove("animate-in");
          element.style.animation = "none";
          element.offsetHeight;
          element.style.animation = "";
        }
      });
    }
  
    triggerAnimations() {
      // Trigger section animations
      const sections = document.querySelectorAll("#details-section section");
      sections.forEach((section) => {
        section.classList.add("animate-in");
      });
  
      // Trigger heading animations
      const headings = document.querySelectorAll("#details-section h2");
      headings.forEach((heading) => {
        heading.classList.add("animate-in");
      });
  
      // Trigger list item animations with original timing for initial page load
      const listItems = document.querySelectorAll("#details-section li");
      listItems.forEach((li) => {
        li.classList.add("animate-in");
      });
  
      // Trigger special element animations
      const profileImage = document.getElementById("profile-image");
      const profileName = document.getElementById("profile-name");
      const profileTitle = document.getElementById("profile-title");
      const aboutText = document.getElementById("about-text");
      const educationSection = document.getElementById("education-section");
      const researchSection = document.getElementById("research-section");
      const profileLinks = document.getElementById("profile-links");
      const servicesContent = document.getElementById("services-content");
  
      [
        profileImage,
        profileName,
        profileTitle,
        aboutText,
        educationSection,
        researchSection,
        profileLinks,
        servicesContent,
      ].forEach((element) => {
        if (element) {
          element.classList.add("animate-in");
        }
      });
    }
  
    // Public method to restart animations (useful for debugging)
    restartAnimations() {
      this.initAnimations();
    }
  
    // Method to animate a specific section when navigated to
    animateSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (!section) return;
  
      // Reset animations for this section and its content
      this.resetSectionAnimations(section);
  
      // Determine animation speed based on section
      const isAboutSection = sectionId === "about";
      const delay = isAboutSection ? 50 : 0;
  
      // Trigger animations after a brief delay
      setTimeout(() => {
        this.triggerSectionAnimations(section, isAboutSection);
      }, delay);
    }
  
    resetSectionAnimations(section) {
      // Reset section itself
      section.classList.remove("animate-in", "simple-fade-in");
      section.style.animation = "none";
      section.offsetHeight;
      section.style.animation = "";
  
      // Reset heading in this section
      const heading = section.querySelector("h2, h3, h4");
      if (heading) {
        heading.classList.remove("animate-in", "simple-fade-in");
        heading.style.animation = "none";
        heading.offsetHeight;
        heading.style.animation = "";
      }
  
      // Reset list items in this section
      const listItems = section.querySelectorAll("li");
      listItems.forEach((li) => {
        li.classList.remove("animate-in", "simple-fade-in");
        li.style.animation = "none";
        li.offsetHeight;
        li.style.animation = "";
      });
  
      // Reset special elements in this section
      const specialElements = section.querySelectorAll(
        "#profile-image, #profile-name, #profile-title, #about-text, #education-section, #research-section, #profile-links, #services-content"
      );
      specialElements.forEach((element) => {
        element.classList.remove("animate-in", "simple-fade-in");
        element.style.animation = "none";
        element.offsetHeight;
        element.style.animation = "";
      });
    }
  
    triggerSectionAnimations(section, isAboutSection = false) {
      if (isAboutSection) {
        // Use original complex animations for About section
        section.classList.add("animate-in");
  
        const heading = section.querySelector("h2, h3, h4");
        if (heading) {
          heading.classList.add("animate-in");
        }
  
        const listItems = section.querySelectorAll("li");
        listItems.forEach((li, index) => {
          setTimeout(() => {
            li.classList.add("animate-in");
          }, index * 50);
        });
  
        const specialElements = section.querySelectorAll(
          "#profile-image, #profile-name, #profile-title, #about-text, #education-section, #research-section, #profile-links, #services-content"
        );
        specialElements.forEach((element) => {
          element.classList.add("animate-in");
        });
      } else {
        // Use animate-in with simple fade override for other sections
        section.classList.add("simple-fade-in");
  
        const heading = section.querySelector("h2, h3, h4");
        if (heading) {
          heading.classList.add("animate-in", "simple-fade-in");
        }
  
        const listItems = section.querySelectorAll("li");
        listItems.forEach((li, index) => {
          setTimeout(() => {
            li.classList.add("animate-in", "simple-fade-in");
          }, index * 100);
        });
  
        const specialElements = section.querySelectorAll("#services-content");
        specialElements.forEach((element) => {
          element.classList.add("animate-in", "simple-fade-in");
        });
      }
    }
  }
  
  // Ensure animations restart when page becomes visible (handles browser back/forward)
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && document.getElementById("details-section")) {
      setTimeout(() => {
        new AnimationManager();
      }, 100);
    }
  });
  
  // Navigation Animation Handler
  class NavigationAnimationHandler {
    constructor() {
      this.animationManager = null;
      this.setupNavigationListeners();
    }
  
    setupNavigationListeners() {
      // Wait for DOM to be ready and animations to be initialized
      setTimeout(() => {
        this.animationManager = new AnimationManager();
        this.bindNavigationEvents();
      }, 300);
    }
  
    bindNavigationEvents() {
      const navLinks = document.querySelectorAll("nav a[href^='#']");
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          // Get the section ID from the href
          const sectionId = link.getAttribute("href").substring(1);
  
          // Small delay to allow scroll to complete
          setTimeout(() => {
            this.animationManager.animateSection(sectionId);
          }, 100);
        });
      });
    }
  }
  
  // Navigation visibility handler
  class NavigationHandler {
    constructor() {
      this.nav = document.getElementById("mainNav");
      this.backToTop = document.getElementById("backToTop");
      this.heroHeight = window.innerHeight;
      this.init();
    }
  
    init() {
      if (!this.nav) {
        console.error("Navigation element not found!");
        return;
      }
  
      console.log("Navigation handler initialized");
  
      // Handle navigation visibility on scroll
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        console.log("Scroll position:", scrolled);
  
        // Show nav as soon as user scrolls down even a little bit
        if (scrolled > 50) {
          console.log("Adding visible class to nav");
          this.nav.classList.add("visible");
        } else {
          console.log("Removing visible class from nav");
          this.nav.classList.remove("visible");
        }
  
        // Show back to top button when scrolled past hero section
        if (this.backToTop && scrolled > this.heroHeight - 100) {
          this.backToTop.classList.add("visible");
        } else if (this.backToTop) {
          this.backToTop.classList.remove("visible");
        }
      });
  
      // Handle back to top button click
      if (this.backToTop) {
        this.backToTop.addEventListener("click", () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }
  
      // Update hero height on resize
      window.addEventListener("resize", () => {
        this.heroHeight = window.innerHeight;
      });
  
      // Force check scroll position on load
      setTimeout(() => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 50) {
          this.nav.classList.add("visible");
        }
  
        // Manually trigger scroll event to ensure handler is working
        window.dispatchEvent(new Event("scroll"));
      }, 100);
    }
  }
  
  // Simplified scroll handler - no duplicate handlers
  class SmoothScrollHandler {
    constructor() {
      this.initialized = false;
      this.init();
    }
  
    init() {
      if (this.initialized) return;
  
      // Wait for DOM to be ready
      setTimeout(() => {
        this.setupHandlers();
        this.initialized = true;
      }, 500);
    }
  
    setupHandlers() {
      console.log("=== Setting up SINGLE scroll handlers ===");
  
      // Only handle More button here, navigation will be handled separately
      const moreLink = document.querySelector(".more-link");
      console.log("More link element found:", !!moreLink);
      if (moreLink) {
        console.log("More link innerHTML:", moreLink.innerHTML);
        console.log("More link classes:", moreLink.className);
      }
  
      if (moreLink && !moreLink.hasAttribute("data-handler-attached")) {
        console.log("Attaching handler to More button...");
        moreLink.setAttribute("data-handler-attached", "true");
        moreLink.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("🔥 More button clicked - handler working!");
  
          // Use stable positioning WITHOUT animations to prevent layout changes
          const detailsSection = document.getElementById("details-section");
          if (detailsSection) {
            // Use offsetTop for stable positioning - not affected by animations
            const yOffset = 0; // Same offset as About navigation
            const targetY = detailsSection.offsetTop + yOffset;
  
            console.log(
              "More button (NO animations) scrolling to Y position:",
              targetY
            );
            console.log("Details section offsetTop:", detailsSection.offsetTop);
            console.log(
              "Window size:",
              window.innerWidth,
              "x",
              window.innerHeight
            );
  
            // DO NOT trigger animations - this was causing the position issue!
            // The More button should only scroll, not animate the content
  
            // Scroll immediately with stable positioning
            window.scrollTo({
              top: targetY,
              behavior: "smooth",
            });
  
            setTimeout(() => {
              document.getElementById("mainNav").classList.add("visible");
            }, 100);
          }
        });
        console.log("✓ More button handler attached");
      }
    }
  }
  
  // Debug function to check elements
  window.debugScroll = function () {
    console.log("=== DEBUG INFO ===");
    console.log("About section:", document.getElementById("about"));
    console.log("Details section:", document.getElementById("details-section"));
    console.log("Navigation:", document.getElementById("mainNav"));
    console.log("More link:", document.querySelector(".more-link"));
    console.log("Current scroll position:", window.pageYOffset);
    console.log(
      "Navigation links:",
      document.querySelectorAll('nav a[href^="#"]')
    );
  
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      console.log("About section offsetTop:", aboutSection.offsetTop);
      console.log(
        "About section getBoundingClientRect:",
        aboutSection.getBoundingClientRect()
      );
    }
  
    // Test scroll functionality
    console.log("\n=== TESTING SCROLL ===");
    console.log(
      "To test More button, run: document.querySelector('.more-link').click()"
    );
    console.log(
      "To force show nav, run: document.getElementById('mainNav').classList.add('visible')"
    );
    console.log(
      "To scroll to about, run: document.getElementById('about').scrollIntoView({behavior:'smooth'})"
    );
  };
  
  // Manual fix function if automatic scrolling fails
  window.fixScroll = function () {
    console.log("=== APPLYING MANUAL FIXES ===");
  
    // Fix More button
    const moreLink = document.querySelector(".more-link");
    if (moreLink) {
      const newMoreLink = moreLink.cloneNode(true);
      moreLink.parentNode.replaceChild(newMoreLink, moreLink);
  
      newMoreLink.onclick = function (e) {
        e.preventDefault();
        const detailsSection = document.getElementById("details-section");
        if (detailsSection) {
          // Use stable positioning WITHOUT animations (same as main More button)
          const yOffset = -90; // Same offset as About navigation
          const targetY = detailsSection.offsetTop + yOffset;
  
          console.log(
            "Manual More button (NO animations) scrolling to Y position:",
            targetY
          );
          console.log("Details section offsetTop:", detailsSection.offsetTop);
          console.log("Window size:", window.innerWidth, "x", window.innerHeight);
  
          // DO NOT trigger animations - scroll only
          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
  
          setTimeout(() => {
            document.getElementById("mainNav").classList.add("visible");
          }, 100);
        }
      };
      console.log("✓ More button fixed");
    }
  
    // Fix nav links - same approach as main handler
    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
  
      newLink.onclick = function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
  
        console.log("Manual fix - clicking:", targetId);
  
        if (target) {
          const yOffset = -68;
          const y =
            target.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
          console.log("Manual fix - scrolling to:", y);
  
          // Trigger animations immediately, then scroll
          if (window.animationManager) {
            window.animationManager.animateSection(targetId);
          }
  
          setTimeout(() => {
            window.scrollTo({ top: y, behavior: "smooth" });
          }, 50);
        }
      };
    });
    console.log("✓ Navigation links fixed");
  
    // Fix scroll detection
    window.onscroll = function () {
      const nav = document.getElementById("mainNav");
      if (window.pageYOffset > 50) {
        nav.classList.add("visible");
      } else {
        nav.classList.remove("visible");
      }
    };
    console.log("✓ Scroll detection fixed");
  
    console.log("\n✅ All manual fixes applied! Navigation should work now.");
  };
  
  // Test scrolling function
  window.testScroll = function () {
    console.log("=== TESTING SCROLL ===");
  
    // Test 1: Can we scroll at all?
    console.log("Current scroll position:", window.pageYOffset);
    console.log("Page height:", document.body.scrollHeight);
    console.log("Window height:", window.innerHeight);
  
    // Test 2: Try scrolling to a specific position
    console.log("Testing scroll to position 500...");
    window.scrollTo({ top: 500, behavior: "smooth" });
  
    setTimeout(() => {
      console.log("New scroll position:", window.pageYOffset);
  
      // Test 3: Try scrolling to bottom
      console.log("Testing scroll to bottom...");
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  
      setTimeout(() => {
        console.log("Final scroll position:", window.pageYOffset);
        console.log("If scroll position changed, CSS is fixed!");
      }, 1000);
    }, 1000);
  };
  
  // Option to disable animations entirely for navigation
  window.disableNavAnimations = function () {
    console.log("=== DISABLING NAVIGATION ANIMATIONS ===");
  
    // Override the navigation handlers to skip animations
    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
  
      newLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
  
        const targetId = newLink.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
  
        if (target) {
          const yOffset = -68;
          const y =
            target.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
          console.log("Direct scroll to:", targetId);
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      });
    });
  
    console.log(
      "✅ Navigation animations disabled. Scrolling is now instant and smooth."
    );
  };
  
  // Option to re-enable animations
  window.enableNavAnimations = function () {
    console.log("=== RE-ENABLING NAVIGATION ANIMATIONS ===");
    console.log(
      "Reload the page to restore animated navigation, or run fixScroll() to get the improved timing."
    );
  };
  
  // Debug function to test More button functionality
  window.debugMoreButton = function () {
    console.log("=== DEBUGGING MORE BUTTON ===");
  
    // Check if More button exists
    const moreLink = document.querySelector(".more-link");
    console.log("More button found:", !!moreLink);
    if (moreLink) {
      console.log("More button element:", moreLink);
      console.log(
        "More button has handler attached:",
        moreLink.hasAttribute("data-handler-attached")
      );
    } else {
      console.error(
        "❌ More button not found! Looking for element with class '.more-link'"
      );
      return;
    }
  
    // Check if Details section exists (this is what More button targets)
    const detailsSection = document.getElementById("details-section");
    console.log("Details section found:", !!detailsSection);
    if (detailsSection) {
      console.log("Details section offsetTop:", detailsSection.offsetTop);
      const targetY = detailsSection.offsetTop - 90;
      console.log("Target scroll position would be:", targetY);
    } else {
      console.error(
        "❌ Details section not found! Looking for element with id 'details-section'"
      );
      return;
    }
  
    // Also check About section (for reference)
    const aboutSection = document.getElementById("about");
    console.log("About section found:", !!aboutSection);
    if (aboutSection) {
      console.log("About section offsetTop:", aboutSection.offsetTop);
    }
  
    // Test the scroll calculation
    if (detailsSection) {
      const yOffset = -90;
      const targetY = detailsSection.offsetTop + yOffset;
      console.log("✅ More button would scroll to:", targetY);
  
      // Test actual scrolling
      console.log("🔧 Testing scroll...");
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  
    console.log("\n=== MANUAL MORE BUTTON TEST ===");
    console.log(
      "Run this to manually trigger More button: document.querySelector('.more-link').click()"
    );
  };
  
  // Debug function to compare More button vs About navigation positioning
  window.comparePositioning = function () {
    console.log("=== POSITIONING COMPARISON ===");
  
    const aboutSection = document.getElementById("about");
    if (!aboutSection) {
      console.error("About section not found!");
      return;
    }
  
    const currentScroll = window.pageYOffset;
  
    console.log("Current window scroll position:", currentScroll);
    console.log("Window size:", window.innerWidth, "x", window.innerHeight);
    console.log("About section offsetTop:", aboutSection.offsetTop);
  
    // Calculate what More button would scroll to (now using stable offsetTop)
    const moreButtonTarget = aboutSection.offsetTop - 90;
    console.log("More button would scroll to:", moreButtonTarget);
  
    // Calculate what About navigation would scroll to (same calculation)
    const aboutNavTarget = aboutSection.offsetTop - 90;
    console.log("About navigation would scroll to:", aboutNavTarget);
  
    console.log(
      "Difference:",
      Math.abs(moreButtonTarget - aboutNavTarget),
      "pixels"
    );
  
    if (Math.abs(moreButtonTarget - aboutNavTarget) === 0) {
      console.log("✅ Perfect! Both calculations are identical and stable.");
    } else {
      console.log("❌ There's a difference - this explains the inconsistency.");
    }
  
    console.log(
      "Note: Using offsetTop ensures stable positioning regardless of animations or scroll state."
    );
  
    console.log(
      "\nTo test More button now:",
      "document.querySelector('.more-link').click()"
    );
  };
  
  // Setup Intersection Observer for job market text animation
  function setupJobMarketAnimation() {
    const jobMarketText = document.querySelector('.job-market-text');
  
    if (!jobMarketText) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the animation class when element comes into view
          entry.target.classList.add('in-view');
  
          // Stop observing after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5, // Trigger when 50% of element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly up
    });
  
    observer.observe(jobMarketText);
  }
  
  // Original content loading functionality
  document.addEventListener("DOMContentLoaded", function () {
    // CRITICAL: Disable browser scroll restoration to prevent automatic scroll preservation on refresh
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
  
    // ALWAYS scroll to top first, regardless of hash or refresh
    window.scrollTo(0, 0);
  
    // Then handle hash-based navigation if present
    if (window.location.hash) {
      // Store the hash for later use
      const targetHash = window.location.hash;
      // Remove hash to prevent auto-scroll
      history.replaceState(null, null, " ");
      // Store for later correction
      window.pendingHashTarget = targetHash;
    }
  
    // Small delay to ensure particles are initialized first
    setTimeout(() => {
      // Initialize theme manager
      new ThemeManager();
  
      // Initialize navigation handler
      new NavigationHandler();
  
      // Initialize smooth scroll handler
      new SmoothScrollHandler();
  
      // Initialize animations
      window.animationManager = new AnimationManager();
  
      // Initialize navigation animations
      new NavigationAnimationHandler();
    }, 100);
  
    // More button will be handled by SmoothScrollHandler
  
    // Load personal info
    fetch("personal_info.json")
      .then((response) => response.json())
      .then((data) => {
        // Always populate both sections since it's a single page now
        document.getElementById("name").textContent = data.name;
        document.getElementById("title").textContent = data.title;
        populateDetailsPage(data);
  
        // Setup job market animation observer
        setupJobMarketAnimation();
  
        // Restart animations after content is loaded
        setTimeout(() => {
          window.animationManager = new AnimationManager();
          new NavigationAnimationHandler();
  
          // Add ONLY navigation handlers - no duplicates
          setTimeout(() => {
            console.log("=== Adding navigation handlers ===");
  
            // Clean approach: remove any existing handlers and add fresh ones
            document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
              // Clone to remove all existing handlers
              const newLink = link.cloneNode(true);
              link.parentNode.replaceChild(newLink, link);
  
              // Add single, clean handler
              newLink.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
  
                const targetId = newLink.getAttribute("href").substring(1);
                const target = document.getElementById(targetId);
  
                console.log("=== NAV CLICK ===");
                console.log("Target ID:", targetId);
                console.log("Target found:", !!target);
  
                if (target) {
                  // Simple, reliable scrolling with fixed offset
                  // Use consistent offset for all sections to move content up
                  const yOffset = -68; // Consistent offset for all sections
                  const y =
                    target.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
  
                  console.log("Scrolling to Y position:", y);
  
                  // Reset and trigger animations IMMEDIATELY before scrolling
                  if (window.animationManager) {
                    window.animationManager.animateSection(targetId);
                  }
  
                  // Small delay to let animations start, then scroll
                  setTimeout(() => {
                    window.scrollTo({
                      top: y,
                      behavior: "smooth",
                    });
                  }, 50);
                } else {
                  console.error("Target not found:", targetId);
                }
              });
            });
  
            console.log("✓ Clean navigation handlers added");
          }, 1000);
        }, 200);
  
        // Handle pending hash target after all content is loaded and positioned
        setTimeout(() => {
          if (window.pendingHashTarget) {
            console.log("=== CORRECTING PAGE LOAD SCROLL ===");
            console.log("Pending hash target:", window.pendingHashTarget);
  
            const targetId = window.pendingHashTarget.substring(1);
            const target = document.getElementById(targetId);
  
            if (target) {
              // Use stable positioning - same as More button and navigation
              const yOffset = targetId === "details-section" ? -68 : -90;
              const correctY = target.offsetTop + yOffset;
  
              console.log("Current scroll position:", window.pageYOffset);
              console.log("Correct scroll position should be:", correctY);
              console.log("Target offsetTop:", target.offsetTop);
              console.log("Using yOffset:", yOffset);
              console.log("Difference:", window.pageYOffset - correctY, "pixels");
  
              // Restore the hash to URL
              history.replaceState(null, null, window.pendingHashTarget);
  
              // Scroll to correct position using stable calculation
              window.scrollTo({
                top: correctY,
                behavior: "instant", // Use instant to avoid animation during page load
              });
  
              // Show navigation if we're in the about section
              if (correctY > 50) {
                document.getElementById("mainNav").classList.add("visible");
              }
  
              console.log("✓ Page load scroll corrected");
            }
  
            // Clear the pending target
            window.pendingHashTarget = null;
          }
        }, 1500); // Wait for all animations and positioning to complete
      })
      .catch((error) => console.error("Error:", error));
  });
  
  // Helper function to format terms with year first and aligned seasons
  function formatTerms(terms) {
    if (!terms || terms.length === 0) return "";
  
    // If single term, reformat to "YYYY Season" format
    if (terms.length === 1) {
      const parts = terms[0].trim().split(" ");
      if (parts.length >= 2) {
        const year = parts[parts.length - 1];
        const season = parts.slice(0, -1).join(" ");
        return `<span class="term-year">${year}</span> ${season}`;
      }
      return terms[0];
    }
  
    // For multiple terms, sort by year (most recent first) and season
    const formattedTerms = terms.map((term) => {
      const parts = term.trim().split(" ");
      if (parts.length >= 2) {
        const year = parts[parts.length - 1];
        const season = parts.slice(0, -1).join(" ");
        return { year: parseInt(year), season, yearStr: year };
      }
      return { year: 0, season: "", yearStr: "", original: term };
    });
  
    // Sort by year (descending) then by season order within the same year
    const seasonOrder = { Spring: 1, Summer: 2, Fall: 3, Winter: 4 };
  
    formattedTerms.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year; // Most recent year first
      }
      return (seasonOrder[a.season] || 0) - (seasonOrder[b.season] || 0);
    });
  
    // Format with structured HTML for alignment
    return formattedTerms
      .map((term) => {
        if (term.yearStr && term.season) {
          return `<span class="term-year">${term.yearStr}</span> ${term.season}`;
        }
        return term.original || `${term.yearStr} ${term.season}`;
      })
      .join("<br>");
  }
  
  function populateDetailsPage(data) {
    // Keep "About Me" heading unchanged
  
    // Populate profile information
    document.getElementById("profile-name").textContent = data.name;
    document.getElementById("profile-title").innerHTML =
      'Ph.D. candidate @UMN, CSOM <span class="job-market-separator">|</span> <span class="job-market-text">On the Job Market</span>';
    document.getElementById("about-text").innerHTML = data["about me"];
  
    // Education section (now in About)
    const educationList = document.getElementById("education-list");
    data.education.forEach((edu) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="year">${edu.year}</span><span class="details"><strong>${edu.degree}</strong> in ${edu.field}<br>${edu.institution}</span>`;
      educationList.appendChild(li);
    });
  
    // Research interests section (now in About)
    const researchList = document.getElementById("research-list");
    const researchTopics = document.createElement("li");
    researchTopics.innerHTML = `<span class="category">Topics</span><span class="content">${data.researchInterests.Topics}</span>`;
    researchList.appendChild(researchTopics);
  
    const researchMethods = document.createElement("li");
    researchMethods.innerHTML = `<span class="category">Methodologies</span><span class="content">${data.researchInterests.Methodologies}</span>`;
    researchList.appendChild(researchMethods);
  
    // Honors and awards section
    const honorsList = document.getElementById("honors-list");
  
    // Process all honors individually (no grouping)
    data.honors.forEach((honor) => {
      const li = document.createElement("li");
  
      // Handle ', Carlson School of Management' formatting
      let awardText = honor.award;
      if (awardText.includes(", Carlson School of Management")) {
        const parts = awardText.split(", Carlson School of Management");
        awardText = `<strong>${parts[0]}</strong>, Carlson School of Management`;
      } else {
        awardText = `<strong>${awardText}</strong>`;
      }
  
      li.innerHTML = `
        <span class="year">${honor.year}</span>
        <span class="details">
          ${awardText}${honor.amount ? ` ${honor.amount}` : ""}
          ${honor.description ? `<br>${honor.description}` : ""}
        </span>
      `;
      honorsList.appendChild(li);
    });
  
    // Working papers section
    const papersList = document.getElementById("papers-list");
    data.workingPapers.forEach((paper) => {
      const li = document.createElement("li");
      let paperText = `• <strong>${paper.title}</strong>`;
  
      // Add status if available
      if (paper.status) {
        paperText += ` <em>${paper.status}</em>`;
      }
  
      // Add "Read More" link to title line if paper has a link
      if (paper.link) {
        paperText += `&nbsp;&nbsp;&nbsp;<a href="${paper.link}" target="_blank">Read More</a>`;
      }
  
      paperText += `<br><em>${paper.authors.join(", ")}</em>`;
  
      if (paper.funding) {
        // Check if funding contains grant/award information
        const isGrantFunding =
          paper.funding.includes("Grant") ||
          paper.funding.includes("Foundation") ||
          paper.funding.includes("Dean's Small Grant");
  
        if (isGrantFunding) {
          paperText += `<br><img src="award.svg" class="award-icon" alt="Award icon"> ${paper.funding}`;
        } else {
          paperText += `<br>${paper.funding}`;
        }
      }
  
      if (paper.presentations && paper.presentations.length > 0) {
        paperText += `<br>${paper.presentations.join(", ")}`;
      }
  
      li.innerHTML = paperText;
      papersList.appendChild(li);
    });
  
    // Talks section
    const talksList = document.getElementById("talks-list");
  
    // Add Conferences category
    if (data.Talks && data.Talks.length > 0) {
      // Add category heading
      const categoryLi = document.createElement("li");
      categoryLi.innerHTML = `<div class="teaching-category">CONFERENCES</div>`;
      talksList.appendChild(categoryLi);
  
      data.Talks.forEach((talk) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="year">${talk.year}</span>
          <span class="details">
            <em>${talk.authors}</em> <strong>${talk.title}</strong><br>
            ${talk.event}, ${talk.location}
          </span>
        `;
        talksList.appendChild(li);
      });
    }
  
    // Teaching experience section (now part of Talks section)
    // Add instructor roles
    if (data.teaching.instructor && data.teaching.instructor.length > 0) {
      // Add category heading
      const categoryLi = document.createElement("li");
      categoryLi.innerHTML = `<div class="teaching-category">INSTRUCTOR</div>`;
      talksList.appendChild(categoryLi);
  
      // Add each course
      data.teaching.instructor.forEach((course) => {
        const li = document.createElement("li");
  
        // Format terms more concisely
        let formattedTerms = formatTerms(course.terms);
  
        let courseContent = `<div class="teaching-course">
          <div class="course-terms">${formattedTerms}</div>
          <div class="course-details">
            <strong>${course.course}</strong> (${course.level})`;
  
        if (course.notes && course.notes.length > 0) {
          course.notes.forEach((note) => {
            courseContent += `<br><span class="course-note">${note}</span>`;
          });
        }
  
        courseContent += `</div></div>`;
        li.innerHTML = courseContent;
        talksList.appendChild(li);
      });
    }
  
    // Add guest lectures
    if (data.teaching.guestLectures && data.teaching.guestLectures.length > 0) {
      // Add category heading
      const categoryLi = document.createElement("li");
      categoryLi.innerHTML = `<div class="teaching-category">GUEST LECTURES</div>`;
      talksList.appendChild(categoryLi);
  
      // Add each lecture
      data.teaching.guestLectures.forEach((lecture) => {
        const li = document.createElement("li");
  
        // Format term with year first
        let formattedTerm = formatTerms([lecture.term]);
  
        // Create topic with optional PDF link
        const topicContent = lecture.pdf 
          ? `<a href="${lecture.pdf}" target="_blank" style="color: inherit; text-decoration: underline; text-underline-offset: 0.3rem;">${lecture.topic}</a>`
          : lecture.topic;
        
        li.innerHTML = `
          <span class="year">${formattedTerm}</span>
          <span class="details">
            <strong>${topicContent}</strong><br>Audience: ${lecture.audience}
          </span>
        `;
        talksList.appendChild(li);
      });
    }
  
    // Services section (skip if element doesn't exist)
    const servicesContent = document.getElementById("services-content");
    if (servicesContent && data.service) {
      let servicesHTML = "";
  
      if (data.service.journalReferee && data.service.journalReferee.length > 0) {
        servicesHTML += `<h3>Journal Referee</h3><ul>`;
        data.service.journalReferee.forEach((service) => {
          servicesHTML += `<li>${service.journal} (${service.period})</li>`;
        });
        servicesHTML += `</ul>`;
      }
  
      if (
        data.service.conferenceReferee &&
        data.service.conferenceReferee.length > 0
      ) {
        servicesHTML += `<h3>Conference Referee</h3><ul>`;
        data.service.conferenceReferee.forEach((service) => {
          servicesHTML += `<li>${service.conference} (${service.period})</li>`;
        });
        servicesHTML += `</ul>`;
      }
  
      if (data.service.other && data.service.other.length > 0) {
        servicesHTML += `<h3>Other Services</h3><ul>`;
        data.service.other.forEach((service) => {
          servicesHTML += `<li>${service.role} (${service.period})</li>`;
        });
        servicesHTML += `</ul>`;
      }
  
      servicesContent.innerHTML = servicesHTML;
    }
  
    // Professional Experience section (now under industry collaboration)
    const experienceList = document.getElementById("experience-list");
  
    if (experienceList && data.professionalExperience) {
      data.professionalExperience.forEach((exp) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="year">${exp.year}</span>
          <span class="details">
            <strong>${exp.role}</strong> at ${exp.company}<br>
            ${exp.location}${
          exp["work for"] ? `<br>Working for: ${exp["work for"]}` : ""
        }
          </span>
        `;
        experienceList.appendChild(li);
      });
    }
  
    // Industry Collaboration section
    const collaborationList = document.getElementById("collaboration-list");
  
    if (
      collaborationList &&
      data.industryCollaboration &&
      data.industryCollaboration.companies
    ) {
      // Add introduction text
      if (data.industryCollaboration.introduction) {
        const introLi = document.createElement("li");
        introLi.innerHTML = data.industryCollaboration.introduction;
        collaborationList.appendChild(introLi);
      }
  
      // Add companies
      data.industryCollaboration.companies.forEach((company) => {
        const li = document.createElement("li");
        li.innerHTML = `• <strong><a href="${company.link}" target="_blank">${company.company}</a></strong> (${company.domain})`;
        collaborationList.appendChild(li);
      });
    }
  
    // Industry Projects section
    const projectsList = document.getElementById("projects-list");
  
    if (projectsList && data.industryProjects && data.industryProjects.projects) {
      // Add introduction text
      if (data.industryProjects.introduction) {
        const introLi = document.createElement("li");
        introLi.innerHTML = data.industryProjects.introduction;
        projectsList.appendChild(introLi);
      }
  
      // Add projects
      data.industryProjects.projects.forEach((project) => {
        const li = document.createElement("li");
        let projectText = `• <strong>${project.Project}</strong> ${project.role}<br>${project.description}`;
  
        // Special handling for TechMemory project
        if (project.Project === "TechMemory") {
          projectText = `• <strong><a href="#" class="techmemory-link" id="techmemory-link">${project.Project}</a></strong> ${project.role}<br>${project.description}`;
        } else if (project.link && project.link !== "To be launched soon") {
          projectText = `• <strong><a href="${project.link}" target="_blank">${project.Project}</a></strong> ${project.role}<br>${project.description}`;
        }
  
        li.innerHTML = projectText.replace(/\n/g, '<br>');
        projectsList.appendChild(li);
      });
    }
  
    // Skills section
    const skillsList = document.getElementById("skills-list");
    if (data.skills) {
      Object.keys(data.skills).forEach((category) => {
        const li = document.createElement("li");
        const categoryName = category
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        li.innerHTML = `<strong>${categoryName}:</strong> ${data.skills[category]}`;
        skillsList.appendChild(li);
      });
    }
  
    // Populate contact links in profile section
    if (data.contact) {
      const emailLink = document.getElementById("email-link");
      const linkedinLink = document.getElementById("linkedin-link");
      const twitterLink = document.getElementById("twitter-link");
      const githubLink = document.getElementById("github-link");
  
      if (emailLink && data.contact.email) {
        emailLink.href = `mailto:${data.contact.email}`;
      }
  
      if (linkedinLink && data.contact.linkedin) {
        linkedinLink.href = data.contact.linkedin;
      }
  
      if (twitterLink && data.contact["X/twitter"]) {
        twitterLink.href = data.contact["X/twitter"];
      }
  
      if (githubLink && data.contact.github) {
        githubLink.href = data.contact.github;
      }
    }
  
    // Footer
    document.getElementById(
      "footer-text"
    ).textContent = `© ${new Date().getFullYear()} ${
      data.name
    }. All rights reserved.`;
  
    // Setup TechMemory WeChat QR modal
    setupTechMemoryModal();
  }
  
  function setupTechMemoryModal() {
    // Create popover and overlay HTML
    const popoverHTML = `
      <div class="wechat-qr-overlay" id="techmemory-overlay"></div>
      <div class="wechat-qr-popover" id="techmemory-popover">
        <div class="wechat-qr-content">
          <span class="wechat-qr-close" id="techmemory-popover-close">&times;</span>
          <img src="techmemory_wechat_QR.jpg" alt="TechMemory WeChat QR Code">
          <p>Scan it with WeChat to gain access</p>
        </div>
      </div>
    `;
  
    // Add popover to body
    document.body.insertAdjacentHTML('beforeend', popoverHTML);
  
    // Get popover elements
    const popover = document.getElementById('techmemory-popover');
    const overlay = document.getElementById('techmemory-overlay');
    const closeBtn = document.getElementById('techmemory-popover-close');
  
    // Function to position popover relative to the link
    function positionPopover(linkElement) {
      const rect = linkElement.getBoundingClientRect();
      const popoverWidth = 230; // Approximate width with padding
      const popoverHeight = 260; // Approximate height with padding
  
      // Calculate position (to the right of the link)
      let left = rect.right + 10;
      let top = rect.top - 50; // Center vertically relative to the link
  
      // Check if popover would go off-screen to the right
      if (left + popoverWidth > window.innerWidth - 20) {
        // Position to the left of the link instead
        left = rect.left - popoverWidth - 10;
      }
  
      // Check if popover would go off-screen to the left
      if (left < 20) {
        // Position below the link instead
        left = rect.left;
        top = rect.bottom + 10;
      }
  
      // Ensure popover doesn't go off-screen at the top
      if (top < 20) {
        top = 20;
      }
  
      // Ensure popover doesn't go off-screen at the bottom
      if (top + popoverHeight > window.innerHeight - 20) {
        top = window.innerHeight - popoverHeight - 20;
      }
  
      // Apply positioning
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
  
      console.log('Popover positioned at:', left, top); // Debug log
    }
  
    // Add event listener to TechMemory link with delay to ensure it exists
    setTimeout(() => {
      const techMemoryLink = document.getElementById('techmemory-link');
      console.log('TechMemory link found:', techMemoryLink); // Debug log
      if (techMemoryLink) {
        techMemoryLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('TechMemory link clicked'); // Debug log
          positionPopover(techMemoryLink);
          popover.classList.add('active');
          overlay.classList.add('active');
        });
        console.log('Event listener attached to TechMemory link'); // Debug log
      } else {
        console.error('TechMemory link not found!');
      }
    }, 500);
  
    // Close popover when clicking the close button
    closeBtn.addEventListener('click', () => {
      popover.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    // Close popover when clicking the overlay
    overlay.addEventListener('click', () => {
      popover.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    // Close popover with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popover.classList.contains('active')) {
        popover.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  
    // Reposition on window resize
    window.addEventListener('resize', () => {
      if (popover.classList.contains('active')) {
        const techMemoryLink = document.getElementById('techmemory-link');
        if (techMemoryLink) {
          positionPopover(techMemoryLink);
        }
      }
    });
  }
  