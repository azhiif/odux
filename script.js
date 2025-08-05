document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});

// Store uploaded images and cart items
let uploadedImages = [];
let cartItems = [];

// Handle image preview and upload
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        const productCard = input.closest('.product-card');
        const imageContainer = productCard.querySelector('img').parentNode;
        
        // Create a container for the uploaded image
        const previewContainer = document.createElement('div');
        previewContainer.className = 'absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center';
        
        // Create the preview image
        const previewImg = document.createElement('img');
        previewImg.className = 'max-w-full max-h-full object-contain';
        
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            
            // Store the image data
            uploadedImages.push({
                product: productCard.querySelector('h3').textContent,
                imageData: e.target.result
            });
            
            // Update the UI
            previewContainer.innerHTML = '';
            previewContainer.appendChild(previewImg);
            imageContainer.innerHTML = '';
            imageContainer.appendChild(previewContainer);
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Add item to cart
function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCartUI();
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
    notification.textContent = `${name} added to cart!`;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update cart UI (if you have a cart icon)
function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
        cartCount.classList.remove('hidden');
    }
}

// Generate WhatsApp message with order details
function generateWhatsAppMessage() {
    let message = 'Hello Odux Art,%0A%0AI would like to place an order with the following details:%0A%0A';
    
    // Add cart items
    if (cartItems.length > 0) {
        message += '*Selected Items:*%0A';
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - $${item.price}%0A`;
        });
        message += '%0A';
    }
    
    // Add custom design details if any
    const designDetails = document.getElementById('designDetails');
    if (designDetails && designDetails.value) {
        message += `*Design Requirements:*%0A${designDetails.value}%0A%0A`;
    }
    
    // Add contact information
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    
    message += '*Contact Information:*%0A';
    message += `Name: ${name}%0A`;
    message += `Email: ${email}%0A`;
    message += `Phone: ${phone}%0A`;
    
    // Add note about images
    if (uploadedImages.length > 0) {
        message += '%0A*Note:* I have uploaded reference images for my order.';
    }
    
    return message;
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    if (!name || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage();
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/919072270271?text=${message}`, '_blank');
    
    // Reset form
    event.target.reset();
    cartItems = [];
    uploadedImages = [];
    updateCartUI();
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
    
    // Toggle mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
