class DropdownBox {
   /**
     * @param {HTMLElement} container
     */
    constructor(container) {
      this.$container = document.querySelector(container);
      this.$options = document.querySelectorAll(`${container} > .select > .select__option`);
      this.$value = this.$container.querySelector('summary').textContent;
      this.mouseDown = false;
      this.addEventListeners();
      this.setAria();
      this.updateValue();
    }
  
    // Setting event listeners
    addEventListeners() {
      this.$container.addEventListener('toggle', () => {
        if (this.$container.open) return;
        this.updateValue();
      })
  
      this.$container.addEventListener('focusout', e => {
        if (this.mouseDown) return;
        this.container.removeAttribute('open');
      })
  
      this.$options.forEach(opt => {
        opt.addEventListener('mousedown', () => {
          this.mouseDown = true;
        })
        opt.addEventListener('mouseup', () => {
          this.mouseDown = false;
          this.$container.removeAttribute('open');
        })
      })

      this.$options.forEach(opt => {
          const that = this;
        opt.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
          that.mouseDown = true;
            }
        })
        opt.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
          this.mouseDown = false;
          that.$container.removeAttribute('open');
            }
        })
      })

  
      this.$container.addEventListener('keydown', e => {
        const keycode = e.key;
        const current = [...this.$options].indexOf(this.$container.querySelector('.active'));
        switch (keycode) {
          case 'Escape': 
            this.$container.removeAttribute('open');
            break;
          case 'ArrowUp': 
            e.preventDefault();
            if (!this.$container.open) this.$container.setAttribute('open', '');
            this.setChecked(this.$options[current > 0 ? current - 1 : 0].querySelector('input'));
            break;
          case 'ArrowDown': 
            e.preventDefault();
            if (!this.$container.open) this.$container.setAttribute('open', '');
            this.setChecked(this.$options[current < this.$options.length - 1 ? current + 1 : this.$options.length - 1].querySelector('input'));
            break;
        }
      })
    }
  
    setAria() {
      this.$container.setAttribute('aria-haspopup', 'listbox');
      this.$container.querySelector('.select').setAttribute('role', 'listbox');
      const summary = this.$container.querySelector('summary');
      summary.setAttribute('aria-label', `unselected listbox`);
      summary.setAttribute('aria-live', `polite`);
      this.$options.forEach(opt => {
        opt.setAttribute('role', 'option');
      });
    }
  
    updateValue() {
      const that = this.$container.querySelector('input:checked');
      if (!that) return;
      this.setValue(that)
    }
  
    setChecked(that) {
      that.checked = true;
      this.setValue(that)
    }
  
    setValue(that) {
      if (this.$value == that.value) return;

      const summary = this.$container.querySelector('summary');
      const pos = [...this.$options].indexOf(that.parentNode) + 1;
      summary.textContent = that.parentNode.textContent;
      summary.setAttribute('aria-label', `${that.value}, listbox ${pos} of ${this.$options.length}`);
      this.$value = that.value;

      this.$options.forEach(opt => {
        opt.classList.remove('active');
        opt.setAttribute('aria-selected', 'false');
      })

      that.parentNode.classList.add('active');
      that.parentNode.setAttribute('aria-selected', 'true');
  
      this.$container.dispatchEvent(new Event('change'));
    }
  }

    
const dropdownBox = new DropdownBox('#filter-select');