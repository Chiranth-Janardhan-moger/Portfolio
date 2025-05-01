// Main application logic for the portfolio website
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  
  // Load and display projects
  displayProjects(getAllProjects());
  updateStats(getAllProjects());
  
  // Set up filter buttons
  setupFilters();
  
  // Set up contact form
  setupContactForm();
  
  // Set up mobile navigation
  setupMobileNav();
  
  // Set up modal close functionality
  setupModal();
});

// Display projects in the projects grid
function displayProjects(projects) {
  const container = document.getElementById('projects-grid');
  
  if (!container) return;
  
  // Clear container
  container.innerHTML = '';
  
  if (projects.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500 col-span-full">No projects found</p>';
    return;
  }
  
  // Add each project to the grid
  projects.forEach(project => {
    const projectCard = createProjectCard(project);
    container.appendChild(projectCard);
  });
}

// Create a project card element
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105';
  card.dataset.category = project.category || 'IOT';
  card.dataset.id = project.id;
  
  // Use placeholder if no image provided
  const imageUrl = project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image';
  const imageAlt = project.imageAlt || project.title;
  
  // Format technologies as badges if they exist
  const techBadges = project.technologies?.map(tech => 
    `<span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1">${tech}</span>`
  ).join('') || '';
  
  card.innerHTML = `
    <div class="relative">
      <img src="${imageUrl}" alt="${imageAlt}" class="w-full h-64 object-cover" style="width: 100%; height: 400px;">
      ${project.featured ? '<span class="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>' : ''}
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900">${project.title}</h3>
      <p class="text-sm text-gray-600 mt-1 line-clamp-2">${project.description}</p>
      <div class="flex flex-wrap mt-3">
        ${techBadges}
      </div>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-xs text-gray-500 capitalize">${project.category || 'Web'}</span>
        <button class="view-details-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
          View Details
        </button>
      </div>
    </div>
  `;
  
  // Add click event for the entire card
  card.addEventListener('click', (e) => {
    // If they clicked the "View Details" button specifically
    if (e.target.classList.contains('view-details-btn')) {
      showProjectDetails(project);
    } else {
      // If they clicked elsewhere on the card
      // Check if there's a code URL, otherwise show details
      if (project.codeUrl) {
        window.open(project.codeUrl, '_blank');
      } else {
        showProjectDetails(project);
      }
    }
  });
  
  return card;
}

// Show project details in modal
function showProjectDetails(project) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  
  if (!modal || !modalContent) return;
  
  // Use placeholder if no image provided
  const imageUrl = project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image';
  const imageAlt = project.imageAlt || project.title;
  
  // Format technologies as badges if they exist
  const techBadges = project.technologies?.map(tech => 
    `<span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1">${tech}</span>`
  ).join('') || '';
  
  modalContent.innerHTML = `
    <div class="relative">
      <img src="${imageUrl}" alt="${imageAlt}" class="w-full object-cover" style="width: 100%; height: 400px;">
      ${project.featured ? '<span class="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>' : ''}
    </div>
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">${project.title}</h2>
      <p class="text-gray-600 mb-4">${project.description}</p>
      
      <div class="mb-4">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Technologies</h3>
        <div class="flex flex-wrap">
          ${techBadges || '<span class="text-gray-500">No technologies specified</span>'}
        </div>
      </div>
      
      <div class="grid grid-cols-1 gap-4 mt-6">
        ${project.codeUrl ? `
          <a href="${project.codeUrl}" target="_blank" class="bg-gray-800 text-white py-2 px-4 rounded-md text-center hover:bg-gray-900 transition-colors">
            View Code on GitHub
          </a>
        ` : `
          <button disabled class="bg-gray-300 text-gray-500 py-2 px-4 rounded-md text-center cursor-not-allowed">
            No Code Repository Available
          </button>
        `}
      </div>
    </div>
  `;
  
  // Show the modal
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

// Set up modal close functionality
function setupModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  
  if (!modal || !closeBtn) return;
  
  // Close modal when clicking the close button
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });
  
  // Close modal when clicking outside of content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });
}

// Set up category filter buttons
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active', 'bg-indigo-100', 'text-indigo-800'));
      
      // Add active class to clicked button
      button.classList.add('active', 'bg-indigo-100', 'text-indigo-800');
      
      // Get the filter value
      const filter = button.dataset.filter;
      
      // Filter projects
      const filteredProjects = getProjectsByCategory(filter);
      displayProjects(filteredProjects);
    });
  });
}

// Update stats counters
function updateStats(projects) {
  const statsProjects = document.getElementById('stats-projects');
  const statsClients = document.getElementById('stats-clients');
  const statsExperience = document.getElementById('stats-experience');
  
  if (statsProjects) {
    statsProjects.textContent = projects.length;
  }
  
  // These would typically come from another source, but we'll set placeholder values
  if (statsClients) {
    statsClients.textContent = '10+';
  }
  
  if (statsExperience) {
    statsExperience.textContent = '5+';
  }
}

// Set up contact form
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get the form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // In a real implementation, you would send this data to your server
    // For now, we'll just show a success message
    
    // Show success message
    const formContainer = contactForm.parentElement;
    formContainer.innerHTML = `
      <div class="text-center">
        <div class="text-green-500 text-5xl mb-4">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
        <p class="text-gray-600">Thanks for reaching out, ${name}. I'll get back to you soon!</p>
      </div>
    `;
    
    // For development purposes, log the data
    console.log({ name, email, message });
  });
}

// Set up mobile navigation
function setupMobileNav() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuButton || !mobileMenu) return;
  
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}