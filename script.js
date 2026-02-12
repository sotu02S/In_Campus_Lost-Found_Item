// DOM Elements
const postItemBtn = document.getElementById('postItemBtn');
const postModal = document.getElementById('postModal');
const detailModal = document.getElementById('detailModal');
const messageModal = document.getElementById('messageModal');
const postItemForm = document.getElementById('postItemForm');
const messageForm = document.getElementById('messageForm');
const itemsGrid = document.getElementById('itemsGrid');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const clearFilters = document.getElementById('clearFilters');

// Local Storage Key
const STORAGE_KEY = 'campus_lost_found_items';

// Initial Sample Data (With Real Images)
const SAMPLE_DATA = [
    { 
        id: 1, 
        type: 'lost', 
        title: 'Black Backpack', 
        category: 'accessories', 
        description: 'Lost my black Nike backpack with laptop inside. Has a red keychain attached.', 
        location: 'Library 2nd Floor', 
        date: '2025-11-08', 
        contact_name: 'John Doe', 
        contact_email: 'john.doe@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    },
    { 
        id: 2, 
        type: 'found', 
        title: 'Blue Water Bottle', 
        category: 'other', 
        description: 'Found a blue Hydro Flask water bottle near the cafeteria entrance.', 
        location: 'Main Cafeteria', 
        date: '2025-11-09', 
        contact_name: 'Jane Smith', 
        contact_email: 'jane.smith@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1770892729461-5993c257f729?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    { 
        id: 3, 
        type: 'lost', 
        title: 'iPhone 13', 
        category: 'electronics', 
        description: 'Lost iPhone 13 Pro in black case. Has a crack on the screen protector.', 
        location: 'Gym Locker Room', 
        date: '2025-11-07', 
        contact_name: 'Mike Johnson', 
        contact_email: 'mike.j@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    },
    { 
        id: 4, 
        type: 'found', 
        title: 'Chemistry Textbook', 
        category: 'books', 
        description: 'Found Chemistry 101 textbook with name "Sarah" written inside.', 
        location: 'Science Building Room 204', 
        date: '2025-11-10', 
        contact_name: 'Emily Davis', 
        contact_email: 'emily.d@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    },
    { 
        id: 5, 
        type: 'lost', 
        title: 'Student ID Card', 
        category: 'keys', 
        description: 'Lost my student ID card somewhere on campus. Name: Alex Brown', 
        location: 'Unknown', 
        date: '2025-11-06', 
        contact_name: 'Alex Brown', 
        contact_email: 'alex.brown@campus.edu', 
        status: 'claimed', 
        photo_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    }
];

// State
let allItems = [];
let currentItemId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    loadItems();
    setupEventListeners();
    setMaxDate();
});

// Initialize Local Storage with sample data if empty
function initStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_DATA));
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Modal controls
    postItemBtn.addEventListener('click', () => openModal(postModal));
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });
    document.getElementById('cancelPost').addEventListener('click', () => closeModal(postModal));
    document.getElementById('cancelMessage').addEventListener('click', () => closeModal(messageModal));
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form submissions
    postItemForm.addEventListener('submit', handlePostItem);
    messageForm.addEventListener('submit', handleSendMessage);

    // Search and filters
    searchInput.addEventListener('input', filterItems);
    typeFilter.addEventListener('change', filterItems);
    categoryFilter.addEventListener('change', filterItems);
    statusFilter.addEventListener('change', filterItems);
    clearFilters.addEventListener('click', resetFilters);
}

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (modal === postModal) {
        postItemForm.reset();
    }
    if (modal === messageModal) {
        messageForm.reset();
    }
}

// Set max date to today
function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('max', today);
}

// Load Items from Local Storage
function loadItems() {
    try {
        itemsGrid.innerHTML = '<div class="loading">Loading items...</div>';
        const stored = localStorage.getItem(STORAGE_KEY);
        allItems = stored ? JSON.parse(stored) : [];
        
        // Sort by ID descending (newest first)
        allItems.sort((a, b) => b.id - a.id);
        
        displayItems(allItems);
    } catch (error) {
        console.error('Error loading items:', error);
        itemsGrid.innerHTML = `
            <div class="no-items">
                <h3>Unable to load items</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Display Items
function displayItems(items) {
    if (items.length === 0) {
        itemsGrid.innerHTML = `
            <div class="no-items">
                <h3>No items found</h3>
                <p>Try adjusting your filters or be the first to post an item!</p>
            </div>
        `;
        return;
    }

    itemsGrid.innerHTML = items.map(item => createItemCard(item)).join('');
    
    // Add click listeners to cards
    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', () => {
            const itemId = card.dataset.id;
            showItemDetail(itemId);
        });
    });
}

// Create Item Card HTML
function createItemCard(item) {
    const imageHTML = item.photo_url 
        ? `<img src="${item.photo_url}" alt="${item.title}" class="item-image">`
        : `<div class="item-image placeholder">📦</div>`;
    
    const date = new Date(item.date).toLocaleDateString();
    
    return `
        <div class="item-card" data-id="${item.id}">
            ${imageHTML}
            <div class="item-content">
                <div class="item-header">
                    <span class="item-badge badge-${item.type}">${item.type}</span>
                    <span class="item-badge badge-${item.status}">${item.status}</span>
                </div>
                <h3 class="item-title">${escapeHtml(item.title)}</h3>
                <span class="item-category">${escapeHtml(item.category)}</span>
                <p class="item-description">${escapeHtml(item.description)}</p>
                <div class="item-meta">
                    <span>📍 ${escapeHtml(item.location)}</span>
                    <span>📅 ${date}</span>
                </div>
            </div>
        </div>
    `;
}

// Show Item Detail
function showItemDetail(itemId) {
    const item = allItems.find(i => i.id === parseInt(itemId));
    if (!item) return;

    currentItemId = itemId;
    
    const imageHTML = item.photo_url 
        ? `<img src="${item.photo_url}" alt="${item.title}" class="detail-image">`
        : `<div class="detail-image placeholder">📦</div>`;
    
    const date = new Date(item.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const claimButton = item.status === 'unclaimed' 
        ? `<button class="btn btn-success" onclick="markAsClaimed(${item.id})">Mark as Claimed</button>`
        : `<button class="btn btn-secondary" disabled>Claimed</button>`;

    document.getElementById('itemDetail').innerHTML = `
        <div class="detail-container">
            <div class="detail-image-container">
                ${imageHTML}
            </div>
            <div class="detail-info">
                <h2>${escapeHtml(item.title)}</h2>
                <div class="detail-badges">
                    <span class="item-badge badge-${item.type}">${item.type}</span>
                    <span class="item-badge badge-${item.status}">${item.status}</span>
                    <span class="item-category">${escapeHtml(item.category)}</span>
                </div>
                
                <div class="detail-section">
                    <h3>Description</h3>
                    <p>${escapeHtml(item.description)}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Location</h3>
                    <p>📍 ${escapeHtml(item.location)}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Date</h3>
                    <p>📅 ${date}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Contact</h3>
                    <p>👤 ${escapeHtml(item.contact_name)}</p>
                    <p>✉️ ${escapeHtml(item.contact_email)}</p>
                </div>
                
                <div class="detail-actions">
                    <button class="btn btn-primary" onclick="openContactModal(${item.id})">Contact Owner</button>
                    ${claimButton}
                </div>
            </div>
        </div>
    `;
    
    openModal(detailModal);
}

// Open Contact Modal
function openContactModal(itemId) {
    currentItemId = itemId;
    closeModal(detailModal);
    openModal(messageModal);
}

// Handle Post Item
async function handlePostItem(e) {
    e.preventDefault();
    
    const formData = new FormData(postItemForm);
    const photoFile = formData.get('photo');
    
    // Convert photo to base64 if exists
    let photoBase64 = null;
    if (photoFile && photoFile.size > 0) {
        if (photoFile.size > 2 * 1024 * 1024) { // 2MB limit for LocalStorage safety
            alert('Photo size must be less than 2MB');
            return;
        }
        try {
            photoBase64 = await fileToBase64(photoFile);
        } catch (err) {
            console.error(err);
            alert("Error processing image.");
            return;
        }
    }
    
    // Create new item object
    const newItem = {
        id: Date.now(), // Use timestamp as ID
        type: formData.get('type'),
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('date'),
        contact_name: formData.get('contactName'),
        contact_email: formData.get('contactEmail'),
        photo_url: photoBase64,
        status: 'unclaimed',
        created_at: new Date().toISOString()
    };
    
    try {
        // Add to local list and save to storage
        allItems.unshift(newItem); // Add to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allItems));
        
        alert('Item posted successfully!');
        closeModal(postModal);
        postItemForm.reset();
        loadItems(); // Refresh display
    } catch (error) {
        console.error('Error posting item:', error);
        if (error.name === 'QuotaExceededError') {
             alert('Storage full! Please clear some data or use smaller images.');
        } else {
             alert('Failed to post item. Please try again.');
        }
    }
}

// Handle Send Message (Simulated)
function handleSendMessage(e) {
    e.preventDefault();
    // Since we don't have a backend to send emails, we just show a success message
    alert('Message sent! (Simulation: The owner would receive an email here).');
    closeModal(messageModal);
    messageForm.reset();
}

// Mark Item as Claimed
function markAsClaimed(itemId) {
    if (!confirm('Are you sure you want to mark this item as claimed?')) {
        return;
    }
    
    try {
        const itemIndex = allItems.findIndex(i => i.id === parseInt(itemId));
        if (itemIndex > -1) {
            allItems[itemIndex].status = 'claimed';
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allItems));
            
            alert('Item marked as claimed!');
            closeModal(detailModal);
            loadItems();
        }
    } catch (error) {
        console.error('Error marking as claimed:', error);
        alert('Failed to update item. Please try again.');
    }
}

// Filter Items
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value;
    const categoryValue = categoryFilter.value;
    const statusValue = statusFilter.value;
    
    const filtered = allItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) ||
                            item.description.toLowerCase().includes(searchTerm) ||
                            item.location.toLowerCase().includes(searchTerm);
        
        const matchesType = typeValue === 'all' || item.type === typeValue;
        const matchesCategory = categoryValue === 'all' || item.category === categoryValue;
        const matchesStatus = statusValue === 'all' || item.status === statusValue;
        
        return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
    
    displayItems(filtered);
}

// Reset Filters
function resetFilters() {
    searchInput.value = '';
    typeFilter.value = 'all';
    categoryFilter.value = 'all';
    statusFilter.value = 'all';
    loadItems(); // Reload original list
}

// Utility Functions
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Make functions global for inline HTML events
window.markAsClaimed = markAsClaimed;

window.openContactModal = openContactModal;

