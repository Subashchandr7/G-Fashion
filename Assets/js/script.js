
// Banner 

let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const bullets = document.querySelectorAll('.bullet');

    function showSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
        slides.forEach(slide => slide.classList.remove('active'));
        bullets.forEach(bullet => bullet.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        bullets[currentSlide].classList.add('active');
    }

    function changeSlider(n) {
        showSlide(currentSlide + n);
    }

    setInterval(() => changeSlider(1), 3000);


    // product three sliders

    let intervals = {};

    function startSlider(id) {
        intervals[id] = setInterval(() => {
            const bar = document.querySelector(`.scrolls:nth-child(${id}) .bar`);
            if (!isMouseOverElement(bar)) {
                const currentTransform = parseInt(getComputedStyle(document.querySelector(`.scrolls:nth-child(${id}) .carousel-track`)).transform.split(',')[4]);
                const slideWidth = document.querySelector(`.scrolls:nth-child(${id}) .carousel-item`).clientWidth;
                document.querySelector(`.scrolls:nth-child(${id}) .carousel-track`).style.transform = `translateX(${currentTransform - slideWidth}px)`;
            }
        }, 1000);
    }

    function stopSlider(id) {
        clearInterval(intervals[id]);
    }

    function changeSlide(id, index) {
        clearInterval(intervals[id]);
        const slideWidth = 100;
        const transformValue = -index * slideWidth + '%';
        document.querySelector(`.scrolls:nth-child(${id}) .carousel-track`).style.transform = 'translateX(' + transformValue + ')';
    }

    function isMouseOverElement(element) {
        const rect = element.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;a

        return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
    }

    // CART ADDING FUNCTION

    let cartItems = [];
    let wishlistItems = [];
    
    
    function addToCart(productId) {
      console.log("hiii");
      const productElement = document.getElementById(productId);
      const proValueElement = productElement.querySelector('.pro_value');
      const nameElement = productElement.querySelector('.name'); 
      const priceElement = productElement.querySelector('.price'); 
    
      const proValue = proValueElement ? proValueElement.innerText : 'Fashion points'; 
      const name = nameElement ? nameElement.innerText : 'Default Name';
      const price = priceElement ? parseFloat(priceElement.innerText.split('$')[1]) : 0; 
      const existingItem = cartItems.find(item => item.id === productId); 
    
      if (!existingItem) {
        cartItems.push({ id: productId, name: name, pro_value: proValue, quantity: 1, price: price, image: getProductImage(productId) });
      } else {
        existingItem.quantity++;
      }
    
      updateCart();
    }
    
    
    
    function addToWishlist(productId) {
      const existingItem = wishlistItems.find(item => item.id === productId);
    
      if (!existingItem) {
        const productElement = document.getElementById(productId);
        const nameElement = productElement.querySelector('.name');
        const priceElement = productElement.querySelector('.price');
        const proValueElement = productElement.querySelector('.pro_value'); 
    
        const proValue = proValueElement ? proValueElement.innerText : 'Default Name';
        const name = nameElement ? nameElement.innerText : 'Default Name';
        const price = priceElement ? parseFloat(priceElement.innerText.split('$')[1]) : 0;
        wishlistItems.push({ id: productId, name, price, pro_value: proValue, image: getProductImage(productId) });
      }
    
      updateWishlist();
    }
    
    
    function removeFromCart(productId) {
      const index = cartItems.findIndex(item => item.id === productId);
      if (index !== -1) {
        cartItems.splice(index, 1);
        updateCart();
      }
    }
    
    function removeFromWishlist(productId) {
      const index = wishlistItems.findIndex(item => item.id === productId);
      if (index !== -1) {
        wishlistItems.splice(index, 1);
        updateWishlist();
      }
    }
    
    
    function updateCart() {
      // console.log("helo");

      const cartElement = document.getElementById('cart');
      const totalPriceElement = document.getElementById('totalPrice');
      cartElement.innerHTML = '';
    
      let totalPrice = 0;
    
      for (const item of cartItems) {
        const productElement = document.createElement('div');
        productElement.classList.add('cart_add'); 
        // Create div for image
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('cart_image');
        const imageElement = document.createElement('img');
        imageElement.src = item.image;
        imageElement.alt = item.id;
        imageElement.classList.add('product-image');
        imageDiv.appendChild(imageElement);
        // Create div for paragraphs
        const paragraphsDiv = document.createElement('div');
        paragraphsDiv.classList.add('cart_para');
        const idParagraph = document.createElement('p');
        idParagraph.innerText = item.name; 
        paragraphsDiv.appendChild(idParagraph);
        const proValueParagraph = document.createElement('p');
        proValueParagraph.innerText = ` ${item.pro_value}`;
        paragraphsDiv.appendChild(proValueParagraph);
        const quantityParagraph = document.createElement('p');
        quantityParagraph.innerHTML = `
          Quantity: 
          <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
          ${item.quantity}
          <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
        `;
        paragraphsDiv.appendChild(quantityParagraph);
        const priceParagraph = document.createElement('p');
        priceParagraph.innerText = `Price: $${item.quantity * item.price}`;
        paragraphsDiv.appendChild(priceParagraph);
        const removeIconParagraph = document.createElement('p');
        removeIconParagraph.innerHTML = `<span class="remove-icon" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></span>`;
        paragraphsDiv.appendChild(removeIconParagraph);
    
        // Append image and paragraphs divs to productElement
        productElement.appendChild(imageDiv);
        productElement.appendChild(paragraphsDiv);
    
        totalPrice += item.quantity * item.price;
        cartElement.appendChild(productElement);
      }
    
      totalPriceElement.innerText = totalPrice;
    
      // Update cart count
      document.getElementById('cartCount').innerText = cartItems.length;
      console.log("how");
    }
    
    
    
    function updateWishlist() {
      const wishlistElement = document.getElementById('wishlist');
      wishlistElement.innerHTML = '';
    
      for (const item of wishlistItems) {
        const productElement = document.createElement('div');
        productElement.classList.add('wish_para');
        productElement.innerHTML = `
          <div class="wishlist-product">
          <div class="wishlist-img">
            <img src="${item.image}" alt="${item.id}" class="product-image"></div>
            <div class="wishlist-details">
            <p class="price">Price: $${item.price}</p>  
              <p class="name">${item.name}</p>
              <h6 class="pro_value">${item.pro_value}</h6>
            </div>
            <span class="remove" onclick="removeFromWishlist('${item.id}')"><i class="fa-solid fa-trash"></i></span>
          </div>
        `;
        wishlistElement.appendChild(productElement);
      }
    
      // Update wishlist count
      document.getElementById('wishlistCount').innerText = wishlistItems.length;
    }
    
    function showCart() {
      updateCart();
      document.getElementById('cartPage').style.display = 'block';
    }
    
    function showWishlist() {
      updateWishlist();
      document.getElementById('wishlistPage').style.display = 'block';
    }
    
    function closeCartPage() {
      document.getElementById('cartPage').style.display = 'none';
    }
    
    function closeWishlistPage() {
      document.getElementById('wishlistPage').style.display = 'none';
    }
    
    function increaseQuantity(productId) {
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
        updateCart();
      }
    }
    
    function decreaseQuantity(productId) {
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        updateCart();
      }
    }
    
    function getProductImage(productId) {
    const productElement = document.getElementById(productId);
    if (productElement) {
    const imgElement = productElement.querySelector('.product_img_sale img');
    if (imgElement) {
      return imgElement.src;
    }
    }
    return 'default-image-url.jpg'; 
    }
    

    // OWL SCROLL

    const initSlider = () => {
      const imageList = document.querySelector(".slider-wrapper .image-list");
      const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
      const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
      const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
      const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
      
      // Handle scrollbar thumb drag
      scrollbarThumb.addEventListener("mousedown", (e) => {
          const startX = e.clientX;
          const thumbPosition = scrollbarThumb.offsetLeft;
          const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
          
          // Update thumb position on mouse move
          const handleMouseMove = (e) => {
              const deltaX = e.clientX - startX;
              const newThumbPosition = thumbPosition + deltaX;
  
              // Ensure the scrollbar thumb stays within bounds
              const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
              const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
              
              scrollbarThumb.style.left = `${boundedPosition}px`;
              imageList.scrollLeft = scrollPosition;
          }
  
          // Remove event listeners on mouse up
          const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
          }
  
          // Add event listeners for drag interaction
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
      });
  
      // Slide images according to the slide button clicks
      slideButtons.forEach(button => {
          button.addEventListener("click", () => {
              const direction = button.id === "prev-slide" ? -1 : 1;
              const scrollAmount = imageList.clientWidth * direction;
              imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
          });
      });
  
       // Show or hide slide buttons based on scroll position
      const handleSlideButtons = () => {
          slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
          slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
      }
  
      // Update scrollbar thumb position based on image scroll
      const updateScrollThumbPosition = () => {
          const scrollPosition = imageList.scrollLeft;
          const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
          scrollbarThumb.style.left = `${thumbPosition}px`;
      }
  
      // Call these two functions when image list scrolls
      imageList.addEventListener("scroll", () => {
          updateScrollThumbPosition();
          handleSlideButtons();
      });
  }
  
  window.addEventListener("resize", initSlider);
  window.addEventListener("load", initSlider);



// NAVBAR ANIME

const navElement = document.querySelector("nav");

const activeElement = document.createElement("div");
activeElement.classList.add("active-element");

const getOffsetLeft = (element) => {
  const elementRect = element.getBoundingClientRect();

  return (
    elementRect.left -
    navElement.getBoundingClientRect().left +
    (elementRect.width - activeElement.offsetWidth) / 2
  );
};

navElement.appendChild(activeElement);

const activeButton = navElement.querySelector("ul li.active button");

document.fonts.ready.then(() => {
  gsap.set(activeElement, {
    x: getOffsetLeft(activeButton),
  });
  gsap.to(activeElement, {
    "--active-element-show": "1",
    duration: 0.2,
  });
});

navElement.querySelectorAll("ul li button").forEach((button, index) => {
  button.addEventListener("click", () => {
    const active = navElement.querySelector("ul li.active");
    const oldIndex = [...active.parentElement.children].indexOf(active);

    if (
      index === oldIndex ||
      navElement.classList.contains("before") ||
      navElement.classList.contains("after")
    ) {
      return;
    }

    const x = getOffsetLeft(button);
    const direction = index > oldIndex ? "after" : "before";
    const spacing = Math.abs(x - getOffsetLeft(active));

    navElement.classList.add(direction);
    active.classList.remove("active");
    button.parentElement.classList.add("active");

    gsap.set(activeElement, {
      rotateY: direction === "before" ? "180deg" : "0deg",
    });

    gsap.to(activeElement, {
      keyframes: [
        {
          "--active-element-width": `${
            spacing > navElement.offsetWidth - 60
              ? navElement.offsetWidth - 60
              : spacing
          }px`,
          duration: 0.3,
          ease: "none",
          onStart: () => {
            createSVG(activeElement);

            gsap.to(activeElement, {
              "--active-element-opacity": 1,
              duration: 0.1,
            });
          },
        },
        {
          "--active-element-scale-x": "0",
          "--active-element-scale-y": ".25",
          "--active-element-width": "0px",
          duration: 0.3,
          onStart: () => {
            gsap.to(activeElement, {
              "--active-element-mask-position": "40%",
              duration: 0.5,
            });
            gsap.to(activeElement, {
              "--active-element-opacity": 0,
              delay: 0.45,
              duration: 0.25,
            });
          },
          onComplete: () => {
            activeElement.innerHTML = "";
            navElement.classList.remove("before", "after");
            activeElement.removeAttribute("style");
            gsap.set(activeElement, {
              x: getOffsetLeft(button),
              "--active-element-show": "1",
            });
          },
        },
      ],
    });

    gsap.to(activeElement, {
      x,
      "--active-element-strike-x": "-50%",
      duration: 0.6,
      ease: "none",
    });
  });
});

const createSVG = (element) => {
  element.innerHTML = `
    <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
      <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#gradient-beam)"/>
      <defs>
        <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="#6AAAFF"/>
          <stop offset="1" stop-color="white"/>
        </linearGradient>
      </defs>
    </svg>
    <div class="strike">
      <svg viewBox="0 0 114 12" preserveAspectRatio="none">
        <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        </g>
      </svg>
      <svg viewBox="0 0 114 12" preserveAspectRatio="none">
        <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        </g>
      </svg>
    </div>
  `;
};