// scroll items /////////////////////////////////////////////////////////////////////////
	
	$(document).ready(function() {
		
	let windowHeight = $(window).height();
	let windowScrollPosTop = $(window).scrollTop();	
	let windowScrollPosBottom = windowHeight + windowScrollPosTop;
		
	jQuery.fn.revealOnScroll = function(direction, speed) {
		
		return this.each(function(){
		let offsetObj = $(this).offset();
		let offsetTop = offsetObj.top; 
		
		if (!$(this).hasClass("hidden")) {
			
			if (direction == "right") {
				
				$(this).css({
					"opacity" :0,
					"right"   :"700px"
				})
			} else {
				$(this).css({
					"opacity" :0,
					"right"   :"-700px"
				})
			}
			
		 $(this).addClass("hidden");	
		}	
		
		if (!$(this).hasClass("done")){
			if (windowScrollPosBottom > offsetTop) {
			$(this).animate({"opacity" :1, "right" : 0}, speed).addClass("done");
				}
			}	
		});
		
	}
		
			$(window).scroll(function(){

			windowHeight = $(window).height();
			windowScrollPosTop = $(window).scrollTop();	
			windowScrollPosBottom = windowHeight + windowScrollPosTop;

			$(".fade").revealOnScroll("right", 3000);
			
			});
		
	});
		
    // scroll items //////////////////////////////////////////////////////////////////////////
    
    // type writer ///////////////////////////////////////////////////////////////////////////

    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
          this.txtElement = txtElement;
          this.words = words;
          this.txt = '';
          this.wordIndex = 0;
          this.wait = parseInt(wait, 10);
          this.type();
          this.isDeleting = false;
        }
      
        type() {
          // Current index of word
          const current = this.wordIndex % this.words.length;
          // Get full text of current word
          const fullTxt = this.words[current];
      
          // Check if deleting
          if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }
      
          // Insert txt into element
          this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
      
          // Initial Type Speed
          let typeSpeed = 300;
      
          if(this.isDeleting) {
            typeSpeed /= 2;
          }
      
          // If word is complete
          if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
          } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
          }
      
          setTimeout(() => this.type(), typeSpeed);
        }
      }
      
      // Init On DOM Load
      document.addEventListener('DOMContentLoaded', init);
      
      // Init App
      function init() {
        const txtElement = document.querySelector('.txt-type');
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
      }

      // type writer /////////////////////////////////////////////////////////////////////////