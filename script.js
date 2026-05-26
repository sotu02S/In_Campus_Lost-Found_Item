// DOM Elements
const postItemBtn = document.getElementById('postItemBtn');
const postModal = document.getElementById('postModal');
const detailModal = document.getElementById('detailModal');
const messageModal = document.getElementById('messageModal');
const profileModal = document.getElementById('profileModal');

const postItemForm = document.getElementById('postItemForm');
const messageForm = document.getElementById('messageForm');
const profileForm = document.getElementById('profileForm');

const itemsGrid = document.getElementById('itemsGrid');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const sortFilter = document.getElementById('sortFilter');
const clearFilters = document.getElementById('clearFilters');
const photoInput = document.getElementById('photo');
const uploadZone = document.getElementById('uploadZone');
const uploadZoneText = document.getElementById('uploadZoneText');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');

// User Profile mini bar elements
const userProfileBar = document.getElementById('userProfileBar');
const userNameBar = document.getElementById('userNameBar');
const userAvatar = document.getElementById('userAvatar');

// Tabs
const browseTabBtn = document.getElementById('browseTabBtn');
const inboxTabBtn = document.getElementById('inboxTabBtn');
const browseTabContent = document.getElementById('browseTabContent');
const inboxTabContent = document.getElementById('inboxTabContent');
const inboxBadge = document.getElementById('inboxBadge');
const unreadCountText = document.getElementById('unreadCountText');
const messageList = document.getElementById('messageList');

// Hero Stats
const statTotalItems = document.getElementById('statTotalItems');
const statUnclaimed = document.getElementById('statUnclaimed');
const statClaimed = document.getElementById('statClaimed');

// Local Storage Keys
const STORAGE_KEY = 'campus_lost_found_items_v2';
const PROFILE_KEY = 'campus_lost_found_profile';
const MESSAGES_KEY = 'campus_lost_found_messages';

const CATEGORY_LABELS = {
    electronics: 'Electronics',
    clothing: 'Clothing',
    books: 'Books & Stationery',
    accessories: 'Accessories',
    keys: 'Keys & Cards',
    other: 'Other'
};

const FALLBACK_IMAGE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="#f1f5f9"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="'Inter', sans-serif" font-size="28" font-weight="600" fill="#94a3b8">📦 No Image Available</text>
</svg>
`.trim();
const FALLBACK_IMAGE_DATA = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(FALLBACK_IMAGE_SVG)}`;

// Default User Profile
const DEFAULT_PROFILE = {
    name: 'Soutam Ghosh',
    email: 'soutam.ghosh@campus.edu'
};

// Initial Sample Data (With items mapped to current user for instant CRUD testing!)
const SAMPLE_DATA = [
    { 
        id: 1, 
        type: 'lost', 
        title: 'Black Nike Backpack', 
        category: 'accessories', 
        description: 'Lost my black Nike backpack containing a gray Dell Inspiron laptop and charger. It has a distinctive red Swiss keychain attached.', 
        location: 'Library 2nd Floor study cubicle', 
        date: '2026-05-24', 
        contact_name: 'Soutam Ghosh', 
        contact_email: 'soutam.ghosh@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' 
    },
    { 
        id: 2, 
        type: 'found', 
        title: 'Blue Hydro Flask Bottle', 
        category: 'other', 
        description: 'Found a 32oz blue Hydro Flask water bottle sitting near the entrance of the cafeteria.', 
        location: 'Main Cafeteria Entrance', 
        date: '2026-05-25', 
        contact_name: 'Jane Smith', 
        contact_email: 'jane.smith@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' 
    },
    { 
        id: 3, 
        type: 'lost', 
        title: 'iPhone 13 Pro', 
        category: 'electronics', 
        description: 'Lost my graphite black iPhone 13 Pro. It is enclosed in a dark green silicone case and has a slight screen protector crack at the top right.', 
        location: 'Student Gym Locker Rooms', 
        date: '2026-05-23', 
        contact_name: 'Soutam Ghosh', 
        contact_email: 'soutam.ghosh@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' 
    },
    { 
        id: 4, 
        type: 'found', 
        title: 'Organic Chemistry Book', 
        category: 'books', 
        description: 'Found an Organic Chemistry Study Guide 3rd Edition. The name "Sarah Jenkins" is written in blue pen on the inside cover.', 
        location: 'Science Center Lecture Hall Room 204', 
        date: '2026-05-26', 
        contact_name: 'Emily Davis', 
        contact_email: 'emily.d@campus.edu', 
        status: 'unclaimed', 
        photo_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' 
    },
    { 
        id: 5, 
        type: 'lost', 
        title: 'Campus Keycard', 
        category: 'keys', 
        description: 'Lost a gray campus proximity keycard with dorm access permissions attached to a blue lanyard.', 
        location: 'West Residence Hall Courtyard', 
        date: '2026-05-21', 
        contact_name: 'Alex Brown', 
        contact_email: 'alex.brown@campus.edu', 
        status: 'claimed', 
        photo_url: 'https://picsum.photos/seed/campus-keycard/600/400'
    }
];

// Initial Simulated Messages for the Default Profile
const SAMPLE_MESSAGES = [
    {
        id: 101,
        item_id: 1,
        item_title: 'Black Nike Backpack',
        owner_email: 'soutam.ghosh@campus.edu',
        sender_name: 'Marcus Vance',
        sender_email: 'marcus.v@campus.edu',
        message: 'Hey Soutam! I was studying in the Library second floor cubicle area yesterday and I saw a black Nike backpack with a red keychain left behind around 4 PM. A security officer walked by and picked it up. Try checking the security desk!',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        unread: true
    },
    {
        id: 102,
        item_id: 3,
        item_title: 'iPhone 13 Pro',
        owner_email: 'soutam.ghosh@campus.edu',
        sender_name: 'Gym Administrator',
        sender_email: 'gym.desk@campus.edu',
        message: 'Hi Soutam, a student turned in a black iPhone with a green case to the gym front desk this morning. Please stop by with another device or student ID so we can verify the passcode and return it to you.',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
        unread: false
    }
];

// State
let allItems = [];
let allMessages = [];
let currentUser = {};
let currentItemId = null;
let selectedCompressedPhoto = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    loadProfile();
    loadItems();
    loadMessages();
    setupEventListeners();
    setMaxDate();
    updateStats();
});

// Setup Local Storage Defaults and Data Migration Filters
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_DATA));
    } else {
        // Migration: Repair broken unsplash links and incorrect HTML Filestack blog links to local asset
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
            let updated = false;
            stored.forEach(item => {
                if (item.photo_url && (
                    item.photo_url.includes('unsplash.com/photo-1589384267710') ||
                    item.photo_url.includes('blog.filestack.com') ||
                    item.photo_url.includes('filestack.com')
                )) {
                    item.photo_url = 'student_id_card.png';
                    updated = true;
                }
            });
            if (updated) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
            }
        } catch (e) {
            console.error('Migration failed:', e);
        }
    }
    if (!localStorage.getItem(PROFILE_KEY)) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
    }
    if (!localStorage.getItem(MESSAGES_KEY)) {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(SAMPLE_MESSAGES));
    }
}

// Load Profile Info and update Header Profile UI
function loadProfile() {
    try {
        const stored = localStorage.getItem(PROFILE_KEY);
        currentUser = stored ? JSON.parse(stored) : DEFAULT_PROFILE;
        
        // Sync Mini bar
        userNameBar.textContent = currentUser.name;
        userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        
        // Pre-fill profile config modal inputs
        document.getElementById('profileName').value = currentUser.name;
        document.getElementById('profileEmail').value = currentUser.email;
    } catch (e) {
        console.error('Error loading profile:', e);
        currentUser = DEFAULT_PROFILE;
    }
}

// Set Max Calendar date picker to today
function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('max', today);
}

// Setup Event Listeners
function setupEventListeners() {
    // Tab switching
    browseTabBtn.addEventListener('click', () => switchTab('browse'));
    inboxTabBtn.addEventListener('click', () => switchTab('inbox'));

    // Open Modals
    postItemBtn.addEventListener('click', () => openPostModal());
    userProfileBar.addEventListener('click', () => openModal(profileModal));

    // Close Modals
    document.getElementById('closePostModal').addEventListener('click', () => closePostModal());
    document.getElementById('closeDetailModal').addEventListener('click', () => closeModal(detailModal));
    document.getElementById('closeMessageModal').addEventListener('click', () => closeModal(messageModal));
    document.getElementById('closeProfileModal').addEventListener('click', () => closeModal(profileModal));
    
    document.getElementById('cancelPost').addEventListener('click', () => closePostModal());
    document.getElementById('cancelMessage').addEventListener('click', () => closeModal(messageModal));
    document.getElementById('cancelProfile').addEventListener('click', () => closeModal(profileModal));

    // Click outside modal
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form Submissions
    postItemForm.addEventListener('submit', handlePostItem);
    messageForm.addEventListener('submit', handleSendMessage);
    profileForm.addEventListener('submit', handleSaveProfile);

    // Search and Filters (debounced to offload render thread at 120fps scrolling/typing)
    searchInput.addEventListener('input', debounce(filterItems, 150));
    typeFilter.addEventListener('change', filterItems);
    categoryFilter.addEventListener('change', filterItems);
    statusFilter.addEventListener('change', filterItems);
    sortFilter.addEventListener('change', filterItems);
    clearFilters.addEventListener('click', resetFilters);

    // Drag-Drop Zone Logic
    uploadZone.addEventListener('click', () => photoInput.click());
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handlePhotoSelection(e.dataTransfer.files[0]);
        }
    });
    
    photoInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handlePhotoSelection(this.files[0]);
        }
    });
}

// Global Modal Controls (Optimized for 90-120fps VSync synchronization)
function openModal(modal) {
    requestAnimationFrame(() => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

function closeModal(modal) {
    requestAnimationFrame(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        if (modal === postModal) {
            postItemForm.reset();
            imagePreviewContainer.style.display = 'none';
            selectedCompressedPhoto = null;
            uploadZoneText.textContent = '📁 Click to select file or drop here';
            document.getElementById('editItemId').value = '';
        }
        if (modal === messageModal) {
            messageForm.reset();
        }
        if (modal === profileModal) {
            profileForm.reset();
            loadProfile(); // Re-populate inputs
        }
    });
}

// Special Post/Edit Modal Controls
function openPostModal(itemId = null) {
    const isEditMode = itemId !== null;
    
    // Set the proper heading title and button values dynamically
    if (isEditMode) {
        const item = allItems.find(i => Number(i.id) === Number(itemId));
        if (!item) return;

        document.getElementById('postModalTitle').textContent = '📝 Edit Item Details';
        document.getElementById('submitPostBtn').textContent = 'Save Changes';
        document.getElementById('editItemId').value = item.id;

        // Fill form fields
        if (item.type === 'lost') {
            document.getElementById('typeLost').checked = true;
        } else {
            document.getElementById('typeFound').checked = true;
        }
        document.getElementById('title').value = item.title;
        document.getElementById('category').value = item.category;
        document.getElementById('description').value = item.description;
        document.getElementById('location').value = item.location;
        document.getElementById('date').value = item.date;

        // Handle image preview for Edit mode
        if (item.photo_url) {
            imagePreview.src = item.photo_url;
            imagePreviewContainer.style.display = 'block';
            uploadZoneText.textContent = '🔄 Click to replace current photo';
            selectedCompressedPhoto = item.photo_url;
        } else {
            imagePreviewContainer.style.display = 'none';
            uploadZoneText.textContent = '📁 Click to add photo';
            selectedCompressedPhoto = null;
        }
    } else {
        document.getElementById('postModalTitle').textContent = '➕ Post an Item';
        document.getElementById('submitPostBtn').textContent = 'Submit Post';
        document.getElementById('editItemId').value = '';
        
        postItemForm.reset();
        imagePreviewContainer.style.display = 'none';
        selectedCompressedPhoto = null;
        uploadZoneText.textContent = '📁 Click to select file or drop here';
    }
    
    openModal(postModal);
}

function closePostModal() {
    closeModal(postModal);
}

// Tab Switching Mechanism
function switchTab(tabId) {
    if (tabId === 'browse') {
        browseTabBtn.classList.add('active');
        inboxTabBtn.classList.remove('active');
        browseTabContent.classList.add('active');
        inboxTabContent.classList.remove('active');
    } else if (tabId === 'inbox') {
        browseTabBtn.classList.remove('active');
        inboxTabBtn.classList.add('active');
        browseTabContent.classList.remove('active');
        inboxTabContent.classList.add('active');
        renderInbox();
    }
}

// Photo Compressor Engine (Shrinks base64 images to avoid localStorage limit)
async function handlePhotoSelection(file) {
    if (!file.type.startsWith('image/')) {
        showToast('Only image files are accepted.', 'error');
        return;
    }
    
    uploadZoneText.textContent = '⚡ Optimizing image...';
    
    try {
        const compressedBase64 = await compressImageFile(file, 800, 600, 0.7);
        selectedCompressedPhoto = compressedBase64;
        
        imagePreview.src = compressedBase64;
        imagePreviewContainer.style.display = 'block';
        uploadZoneText.textContent = `✅ ${file.name} optimized!`;
    } catch (e) {
        console.error('Image compression failed:', e);
        showToast('Error processing and optimizing photo.', 'error');
        uploadZoneText.textContent = '❌ Optimization failed. Try again.';
    }
}

function compressImageFile(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new aspect ratios
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress and export to JPEG
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}

// Load and Display Items
function loadItems() {
    try {
        itemsGrid.innerHTML = '<div class="loading">Loading campus inventory...</div>';
        const stored = localStorage.getItem(STORAGE_KEY);
        allItems = stored ? JSON.parse(stored) : SAMPLE_DATA;
        
        // Sort newest first by default
        allItems.sort((a, b) => b.id - a.id);
        
        displayItems(allItems);
        updateStats();
    } catch (error) {
        console.error('Error loading database:', error);
        itemsGrid.innerHTML = `
            <div class="no-items">
                <h3>⚠️ Data Fetch Error</h3>
                <p>There was a problem reading student records from the browser database.</p>
            </div>
        `;
    }
}

function displayItems(items) {
    if (items.length === 0) {
        itemsGrid.innerHTML = `
            <div class="no-items">
                <h3>No items found</h3>
                <p>Adjust your search filters, or post a new report to help other students!</p>
            </div>
        `;
        return;
    }

    itemsGrid.innerHTML = items.map(item => {
        const imageHTML = item.photo_url 
            ? `<img src="${item.photo_url}" alt="${escapeHtml(item.title)}" class="item-image" data-fallback="true">`
            : `<div class="item-image placeholder">📦</div>`;
            
        const categoryLabel = getCategoryLabel(item.category);
        const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="item-card" data-id="${item.id}">
                <div class="image-container-relative">
                    ${imageHTML}
                    <div class="card-badges-overlay">
                        <span class="item-badge badge-${item.type}">${item.type}</span>
                        <span class="item-badge badge-${item.status}">${item.status}</span>
                    </div>
                </div>
                <div class="item-content">
                    <div class="item-title-row">
                        <h3 class="item-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>
                    </div>
                    <span class="item-category-pill">${escapeHtml(categoryLabel)}</span>
                    <p class="item-description">${escapeHtml(item.description)}</p>
                    <div class="item-meta">
                        <span>📍 ${escapeHtml(item.location)}</span>
                        <span>📅 ${formattedDate}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    applyImageFallbacks(itemsGrid);

    // Dynamic click listeners for cards
    itemsGrid.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', () => {
            const itemId = card.dataset.id;
            showItemDetail(itemId);
        });
    });
}

// Show Item Detail View Modal
function showItemDetail(itemId) {
    const item = allItems.find(i => Number(i.id) === Number(itemId));
    if (!item) return;

    currentItemId = itemId;
    
    const imageHTML = item.photo_url 
        ? `<img src="${item.photo_url}" alt="${escapeHtml(item.title)}" class="detail-image" data-fallback="true">`
        : `<div class="detail-image placeholder">📦</div>`;
        
    const categoryLabel = getCategoryLabel(item.category);
    const dateFormatted = new Date(item.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Check if the current user "owns" this item
    const isOwner = currentUser.email.toLowerCase() === item.contact_email.toLowerCase();
    
    let adminActionsHTML = '';
    let contactActionHTML = '';
    
    if (isOwner) {
        // Owner gets Edit, Delete, and Claim controls
        const claimBtnLabel = item.status === 'unclaimed' ? 'Mark as Claimed' : 'Mark as Unclaimed';
        const claimBtnClass = item.status === 'unclaimed' ? 'btn-success' : 'btn-secondary';
        
        adminActionsHTML = `
            <div class="detail-section" style="border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
                <h3 style="color: var(--warning);">⭐ You Posted This Item</h3>
                <div class="detail-actions" style="margin-top: 0.85rem;">
                    <button class="btn ${claimBtnClass}" id="toggleClaimBtn">${claimBtnLabel}</button>
                    <button class="btn btn-primary" id="editItemBtn">✏️ Edit Details</button>
                    <button class="btn btn-danger" id="deleteItemBtn">🗑️ Delete Report</button>
                </div>
            </div>
        `;
    } else {
        // General user gets Contact Owner button
        contactActionHTML = `
            <div class="detail-actions">
                <button class="btn btn-primary" id="contactOwnerBtn" ${item.status === 'claimed' ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
                    📬 Message Owner
                </button>
            </div>
        `;
    }

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
                    <span class="item-badge" style="background-color: var(--primary-light); color: var(--primary);">${escapeHtml(categoryLabel)}</span>
                </div>
                
                <div class="detail-section">
                    <h3>Detailed Description</h3>
                    <p>${escapeHtml(item.description)}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Reported Location</h3>
                    <p>📍 ${escapeHtml(item.location)}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Date Reported</h3>
                    <p>📅 ${dateFormatted}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Posted By</h3>
                    <p>👤 ${escapeHtml(item.contact_name)} ${isOwner ? '<span style="font-size: 0.8rem; background: var(--warning); color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-left: 6px;">YOU</span>' : ''}</p>
                    <p>✉️ <span style="font-size:0.9rem; color: var(--text-muted);">${escapeHtml(item.contact_email)}</span></p>
                </div>
                
                ${contactActionHTML}
                ${adminActionsHTML}
            </div>
        </div>
    `;
    
    applyImageFallbacks(document.getElementById('itemDetail'));
    openModal(detailModal);

    // Attach dynamic events for Detail View Buttons
    if (isOwner) {
        document.getElementById('toggleClaimBtn').addEventListener('click', () => toggleItemClaimStatus(item.id));
        document.getElementById('editItemBtn').addEventListener('click', () => {
            closeModal(detailModal);
            openPostModal(item.id);
        });
        document.getElementById('deleteItemBtn').addEventListener('click', () => deleteItemReport(item.id));
    } else {
        document.getElementById('contactOwnerBtn').addEventListener('click', () => {
            closeModal(detailModal);
            openContactFormModal();
        });
    }
}

// Open Contact Form for standard users
function openContactFormModal() {
    // Pre-fill fields with current user's profile detail to save typing
    document.getElementById('senderName').value = currentUser.name;
    document.getElementById('senderEmail').value = currentUser.email;
    openModal(messageModal);
}

// CRUD: Mark claimed toggle
function toggleItemClaimStatus(itemId) {
    try {
        const index = allItems.findIndex(i => Number(i.id) === Number(itemId));
        if (index > -1) {
            const currentStatus = allItems[index].status;
            allItems[index].status = currentStatus === 'unclaimed' ? 'claimed' : 'unclaimed';
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allItems));
            showToast(`Item successfully marked as ${allItems[index].status}!`, 'success');
            
            // Reload views
            closeModal(detailModal);
            loadItems();
        }
    } catch (e) {
        console.error(e);
        showToast('Failed to update status.', 'error');
    }
}

// CRUD: Delete Item
function deleteItemReport(itemId) {
    const verify = confirm('Are you sure you want to permanently delete this report? This action is irreversible.');
    if (!verify) return;
    
    try {
        allItems = allItems.filter(i => Number(i.id) !== Number(itemId));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allItems));
        
        showToast('Report deleted successfully.', 'success');
        closeModal(detailModal);
        loadItems();
    } catch (e) {
        console.error(e);
        showToast('Failed to delete report.', 'error');
    }
}

// CRUD: Post / Save Edited Item with security sanitization and rate limits
async function handlePostItem(e) {
    e.preventDefault();
    
    const formData = new FormData(postItemForm);
    const editId = document.getElementById('editItemId').value;
    const isEditMode = editId !== '';
    
    // Enforcement of Client-side Rate Limiting (max 3 posts per 5 mins)
    if (!isEditMode) {
        const cooldown = checkRateLimit('post');
        if (cooldown !== true) {
            showToast(`Rate limit exceeded! Please wait ${cooldown} seconds before posting again.`, 'error');
            return;
        }
    }
    
    const itemType = formData.get('type');
    const itemTitle = formData.get('title');
    const itemCategory = formData.get('category');
    const itemDescription = formData.get('description');
    const itemLocation = formData.get('location');
    const itemDate = formData.get('date');
    
    try {
        if (isEditMode) {
            const index = allItems.findIndex(i => Number(i.id) === Number(editId));
            if (index > -1) {
                // Securely sanitize inputs before saving
                allItems[index].type = itemType;
                allItems[index].title = sanitizeInput(itemTitle);
                allItems[index].category = itemCategory;
                allItems[index].description = sanitizeInput(itemDescription);
                allItems[index].location = sanitizeInput(itemLocation);
                allItems[index].date = itemDate;
                
                if (selectedCompressedPhoto) {
                    allItems[index].photo_url = selectedCompressedPhoto;
                }
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allItems));
                showToast('Item updated successfully!', 'success');
            }
        } else {
            // Securely sanitize inputs and map with student profile identity
            const newItem = {
                id: Date.now(),
                type: itemType,
                title: sanitizeInput(itemTitle),
                category: itemCategory,
                description: sanitizeInput(itemDescription),
                location: sanitizeInput(itemLocation),
                date: itemDate,
                contact_name: sanitizeInput(currentUser.name),
                contact_email: sanitizeInput(currentUser.email),
                photo_url: selectedCompressedPhoto,
                status: 'unclaimed',
                created_at: new Date().toISOString()
            };
            
            allItems.unshift(newItem);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allItems));
            showToast('New report posted successfully!', 'success');
        }
        
        closePostModal();
        loadItems();
    } catch (error) {
        console.error('Error saving item:', error);
        if (error.name === 'QuotaExceededError') {
            showToast('Database full! Please remove other photos or use smaller images.', 'error');
        } else {
            showToast('Failed to write report records to browser storage.', 'error');
        }
    }
}

// Profile Save Handler
function handleSaveProfile(e) {
    e.preventDefault();
    
    const profileName = document.getElementById('profileName').value.trim();
    const profileEmail = document.getElementById('profileEmail').value.trim();
    
    if (!profileName || !profileEmail) {
        showToast('Please fill out all profile fields.', 'error');
        return;
    }
    
    try {
        // Enforce strict sanitization on profile attributes
        currentUser = {
            name: sanitizeInput(profileName),
            email: sanitizeInput(profileEmail)
        };
        
        localStorage.setItem(PROFILE_KEY, JSON.stringify(currentUser));
        loadProfile();
        showToast('Profile configuration updated!', 'success');
        closeModal(profileModal);
        
        // Refresh items grid and inbox since "ownership" of items might have changed
        loadItems();
        loadMessages();
    } catch (err) {
        console.error(err);
        showToast('Failed to update student profile.', 'error');
    }
}

// Simulated Message System: Load Messages
function loadMessages() {
    try {
        const stored = localStorage.getItem(MESSAGES_KEY);
        allMessages = stored ? JSON.parse(stored) : SAMPLE_MESSAGES;
        updateUnreadBadges();
    } catch (err) {
        console.error('Error fetching messages:', err);
        allMessages = [];
    }
}

// Calculate and render unread badge in navigation tabs
function updateUnreadBadges() {
    // Filter messages belonging to current logged student profile email
    const userEmailLower = currentUser.email.toLowerCase();
    const userMessages = allMessages.filter(m => m.owner_email.toLowerCase() === userEmailLower);
    const unreadCount = userMessages.filter(m => m.unread).length;
    
    if (unreadCount > 0) {
        inboxBadge.textContent = unreadCount;
        inboxBadge.style.display = 'inline-block';
        unreadCountText.textContent = `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`;
    } else {
        inboxBadge.style.display = 'none';
        unreadCountText.textContent = 'All messages read';
    }
}

// Send Message Handler with rate limits and XSS security filters
function handleSendMessage(e) {
    e.preventDefault();
    
    // Enforcement of Client-side Rate Limiting (max 5 messages per 2 mins)
    const cooldown = checkRateLimit('message');
    if (cooldown !== true) {
        showToast(`Rate limit exceeded! Please wait ${cooldown} seconds before sending another inquiry.`, 'error');
        return;
    }
    
    const item = allItems.find(i => Number(i.id) === Number(currentItemId));
    if (!item) return;
    
    const senderName = document.getElementById('senderName').value.trim();
    const senderEmail = document.getElementById('senderEmail').value.trim();
    const messageContent = document.getElementById('message').value.trim();
    
    // Enforce sanitization on inquiry message details
    const newMessage = {
        id: Date.now(),
        item_id: item.id,
        item_title: item.title,
        owner_email: item.contact_email, // Target mailbox
        sender_name: sanitizeInput(senderName),
        sender_email: sanitizeInput(senderEmail),
        message: sanitizeInput(messageContent),
        timestamp: new Date().toISOString(),
        unread: true
    };
    
    try {
        allMessages.unshift(newMessage);
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
        
        showToast(`Inquiry sent to ${item.contact_name}!`, 'success');
        closeModal(messageModal);
        
        // Refresh local stats if inbox is looking at it
        updateUnreadBadges();
    } catch (err) {
        console.error(err);
        showToast('Inquiry sending failed.', 'error');
    }
}

// Render Messaging Inbox Dashboard List
function renderInbox() {
    const userEmailLower = currentUser.email.toLowerCase();
    const userMessages = allMessages.filter(m => m.owner_email.toLowerCase() === userEmailLower);
    
    if (userMessages.length === 0) {
        messageList.innerHTML = `
            <div class="no-messages">
                <div class="inbox-icon">📬</div>
                <h3>Your Inbox is Empty</h3>
                <p>When students inquire about items you posted (${currentUser.email}), messages will appear here in real-time.</p>
            </div>
        `;
        return;
    }
    
    // Sort messages newest first
    userMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    messageList.innerHTML = userMessages.map(msg => {
        const dateStr = new Date(msg.timestamp).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const unreadClass = msg.unread ? 'unread' : '';
        const markReadBtn = msg.unread 
            ? `<button class="btn btn-secondary btn-mini" onclick="markMessageRead(${msg.id})">Mark as Read</button>`
            : '';
            
        return `
            <div class="message-item ${unreadClass}">
                <div class="message-item-header">
                    <div class="message-sender">
                        ${escapeHtml(msg.sender_name)} 
                        <span>(${escapeHtml(msg.sender_email)})</span>
                    </div>
                    <div class="message-time">${dateStr}</div>
                </div>
                <div class="message-item-body">${escapeHtml(msg.message)}</div>
                <div class="message-item-footer">
                    <a href="#" class="message-context-link" onclick="viewMessageContext(${msg.item_id}); return false;">
                        Regarding: "${escapeHtml(msg.item_title)}"
                    </a>
                    <div class="message-actions">
                        ${markReadBtn}
                        <button class="btn btn-primary btn-mini" onclick="initiateMessageReply('${escapeHtml(msg.sender_name)}', '${escapeHtml(msg.sender_email)}', '${escapeHtml(msg.item_title)}')">Reply</button>
                        <button class="btn btn-danger btn-mini" onclick="deleteMessage(${msg.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Mark Message as Read
function markMessageRead(msgId) {
    try {
        const index = allMessages.findIndex(m => Number(m.id) === Number(msgId));
        if (index > -1) {
            allMessages[index].unread = false;
            localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
            updateUnreadBadges();
            renderInbox();
        }
    } catch (e) {
        console.error(e);
    }
}

// Delete Message
function deleteMessage(msgId) {
    const verify = confirm('Are you sure you want to delete this message from your inbox?');
    if (!verify) return;
    
    try {
        allMessages = allMessages.filter(m => Number(m.id) !== Number(msgId));
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
        updateUnreadBadges();
        renderInbox();
        showToast('Message deleted.', 'success');
    } catch (e) {
        console.error(e);
    }
}

// View the item details associated with a message
function viewMessageContext(itemId) {
    switchTab('browse');
    showItemDetail(itemId);
}

// Initiate an email reply simulation (opens draft compose popup)
function initiateMessageReply(recipientName, recipientEmail, itemTitle) {
    currentItemId = allItems.find(i => i.title === itemTitle)?.id || null;
    
    // Switch modals context
    openModal(messageModal);
    
    // Set headers
    document.getElementById('senderName').value = currentUser.name;
    document.getElementById('senderEmail').value = currentUser.email;
    document.getElementById('message').value = `Hi ${recipientName},\n\nRegarding the "${itemTitle}"... `;
    
    // Simulate updating target mailbox dynamically to the sender
    const itemIndex = allItems.findIndex(i => i.id === currentItemId);
    if (itemIndex > -1) {
        // Temporarily adjust current item contact details so reply targets them!
        allItems[itemIndex].contact_email = recipientEmail;
        allItems[itemIndex].contact_name = recipientName;
    }
}

// Stats Counter
function updateStats() {
    if (!statTotalItems) return;
    
    const total = allItems.length;
    const unclaimed = allItems.filter(i => i.status === 'unclaimed').length;
    const claimed = allItems.filter(i => i.status === 'claimed').length;
    
    statTotalItems.textContent = total;
    statUnclaimed.textContent = unclaimed;
    statClaimed.textContent = claimed;
}

// Filter Items Action
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value;
    const categoryValue = categoryFilter.value;
    const statusValue = statusFilter.value;
    const sortValue = sortFilter.value;
    
    let filtered = allItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) ||
                            item.description.toLowerCase().includes(searchTerm) ||
                            item.location.toLowerCase().includes(searchTerm) ||
                            (CATEGORY_LABELS[item.category] || '').toLowerCase().includes(searchTerm);
        
        const matchesType = typeValue === 'all' || item.type === typeValue;
        const matchesCategory = categoryValue === 'all' || item.category === categoryValue;
        const matchesStatus = statusValue === 'all' || item.status === statusValue;
        
        return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });

    if (sortValue === 'newest') {
        filtered.sort((a, b) => b.id - a.id);
    } else if (sortValue === 'oldest') {
        filtered.sort((a, b) => a.id - b.id);
    }
    
    displayItems(filtered);
}

// Reset Filters
function resetFilters() {
    searchInput.value = '';
    typeFilter.value = 'all';
    categoryFilter.value = 'all';
    statusFilter.value = 'all';
    sortFilter.value = 'newest';
    filterItems();
    showToast('Filters cleared', 'info');
}

// Helper Utilities
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const safeText = String(text);
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return safeText.replace(/[&<>"']/g, m => map[m]);
}

function getCategoryLabel(category) {
    if (!category) return '';
    return CATEGORY_LABELS[category] || category;
}

// Apply Image Fallbacks to broken images
function applyImageFallbacks(container) {
    if (!container) return;
    container.querySelectorAll('img[data-fallback="true"]').forEach(img => {
        if (img.complete && img.naturalWidth === 0) {
            setImageFallback(img);
            return;
        }
        if (img.dataset.fallbackBound === 'true') {
            return;
        }
        img.dataset.fallbackBound = 'true';
        img.addEventListener('error', handleImageFallback, { once: true });
    });
}

function handleImageFallback(event) {
    const img = event.currentTarget;
    setImageFallback(img);
}

function setImageFallback(img) {
    img.src = FALLBACK_IMAGE_DATA;
    img.classList.add('image-fallback');
}

// Toast Notifications System (SVG enabled)
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSVG = '';
    if (type === 'success') {
        iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
        iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
        iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
        <div class="toast-icon">${iconSVG}</div>
        <div class="toast-message-text">${message}</div>
    `;

    container.appendChild(toast);

    // Sync transition with 120fps display refresh cycles
    requestAnimationFrame(() => {
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
    });

    // Slide out and remove
    setTimeout(() => {
        requestAnimationFrame(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        });
    }, 3200);
}

// Expose handlers globally for dynamic template binding
window.markMessageRead = markMessageRead;
window.deleteMessage = deleteMessage;
window.viewMessageContext = viewMessageContext;
window.initiateMessageReply = initiateMessageReply;

// ==========================================
// 🛡️ Security, Rate-Limiting & High-FPS Utilities
// ==========================================

// Rate Limiter Engine
function checkRateLimit(actionType) {
    const now = Date.now();
    let timestamps = [];
    let limitMs = 0;
    let limitCount = 0;
    const storageKey = `rate_limit_${actionType}`;
    
    if (actionType === 'post') {
        limitMs = 300000; // 5 minutes
        limitCount = 3;
    } else if (actionType === 'message') {
        limitMs = 120000; // 2 minutes
        limitCount = 5;
    }
    
    try {
        const stored = localStorage.getItem(storageKey);
        timestamps = stored ? JSON.parse(stored) : [];
    } catch (e) {
        timestamps = [];
    }
    
    // Filter timestamps within the limit window
    timestamps = timestamps.filter(t => now - t < limitMs);
    
    if (timestamps.length >= limitCount) {
        const oldest = timestamps[0];
        const remainingSec = Math.ceil((limitMs - (now - oldest)) / 1000);
        return remainingSec;
    }
    
    timestamps.push(now);
    try {
        localStorage.setItem(storageKey, JSON.stringify(timestamps));
    } catch (e) {
        console.error(e);
    }
    return true;
}

// Debouncer Utility (Keeps typing fluid at 90-120fps)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Strict Input Sanitizer to strip XSS script tags and boundary markup
function sanitizeInput(text) {
    if (text === null || text === undefined) return '';
    // Strip HTML boundary elements altogether
    let clean = String(text).replace(/<\/?[^>]+(>|$)/g, "");
    return escapeHtml(clean);
}
