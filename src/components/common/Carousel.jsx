import React from 'react';

export class Carousel extends React.Component {
  itemsWrapper;
  viewSize;
  firstIndexInView;
  currentIndex;
  carousel;
  translate;
  previousButton;
  nextButton;

  constructor(props) {
    super(props);
    this.viewSize = 6;
    this.firstIndexInView = 0;
    this.currentIndex = 0;
    this.translate = 0;
  }

  componentDidMount() {
    this.itemsWrapper = $(this.refs.itemsWrapper);
    this.carousel = $(this.refs.carousel);
    this.previousButton = $(this.refs.previousButton);
    this.nextButton = $(this.refs.nextButton);
    this.hideNeighbouringItems();
    this.updateNavigationButtons();
  }

  renderPlaceImages() {
    return this.props.placeImages.map((image, index) => {
      const photoUrl = `${image.getUrl({maxWidth: 200, maxHeight: 200})}`
      return (
        <div key={photoUrl} className={this.getImageClassName(index)}>
          <img className="carousel-item--img" src={photoUrl} />
        </div>
      )
    })
  }

  getImageClassName(index) {
    if (index === this.currentIndex) {
      return 'carousel-item active';
    }
    return 'carousel-item';
  }

  nextPics(event) {
    const nextDisplayCount = this.getNextDisplayCount(2);

    if (nextDisplayCount === 0) return;
    this.itemsWrapper.find('.carousel-item').removeClass('hidden');
    this.translate -= this.computeTranslateDistance(nextDisplayCount);
    this.firstIndexInView += nextDisplayCount;
    this.itemsWrapper.css({
      transform: `translate(${this.translate}px)`
    });
  }

  prevPics(event) {
    const nextDisplayCount = this.getNextDisplayCount(false);
    if (nextDisplayCount === 0) {
      return;
    }

    this.itemsWrapper.find('.carousel-item').removeClass('hidden');
    this.translate += this.computeTranslateDistance(nextDisplayCount);
    this.firstIndexInView -= nextDisplayCount;
    this.itemsWrapper.css({
      transform: `translate(${this.translate}px)`
    });
  }

  getNextDisplayCount(forwards) {
    if (forwards) {
      const newIndex = this.firstIndexInView + (this.viewSize * 2);

      if (newIndex < this.props.placeImages.length) {
        return this.viewSize;
      }
      return this.props.placeImages.length - (this.firstIndexInView + this.viewSize);
    } else {
      const newIndex = this.firstIndexInView - this.viewSize;

      if (newIndex >= 0) {
        return this.viewSize;
      }
      return newIndex + this.viewSize;
    }
  }

  computeTranslateDistance(itemsCount) {
    const marginLeft = this.carousel.find('.carousel-item').next().css('margin-left');
    const borderLeftWidth = this.carousel.find('.carousel-item').css('border-left-width');
    const borderRightWidth = this.carousel.find('.carousel-item').css('border-width');
    let step = this.carousel.find('.carousel-item').width() + parseInt(marginLeft, 10);
    step += parseInt(borderLeftWidth, 10) + parseInt(borderRightWidth, 10);
    return step * itemsCount;
  }

  onTransitionEnd(event) {
    this.updateNavigationButtons();
    this.hideNeighbouringItems();
  }

  updateNavigationButtons() {
    if (this.firstIndexInView > 0) {
      this.previousButton.removeClass('hidden');
    } else {
      this.previousButton.addClass('hidden');
    }

    if (this.firstIndexInView === (this.props.placeImages.length - this.viewSize)) {
      this.nextButton.addClass('hidden');
    } else {
      this.nextButton.removeClass('hidden');
    }

    if (this.props.placeImages.length <= 6) {
      this.nextButton.addClass('hidden');
    }
  }

  hideNeighbouringItems() {
    const leftNeighbourIndex = this.firstIndexInView - 1;
    const rightNeighbourIndex = this.firstIndexInView + this.viewSize;

    if (leftNeighbourIndex >= 0) {
      this.itemsWrapper.find('.carousel-item').eq(leftNeighbourIndex).addClass('hidden');
    }

    if (rightNeighbourIndex < this.props.placeImages.length) {
      this.itemsWrapper.find('.carousel-item').eq(rightNeighbourIndex).addClass('hidden');
    }
  }

  render() {
    return (
      <div className="carousel" ref="carousel">
        <button className="carousel-prev hidden" ref="previousButton" onClick={this.prevPics.bind(this)} />
        <button className="carousel-next" ref="nextButton" onClick={this.nextPics.bind(this)} />
        <div className="carousel-viewport">
          <div className="carousel-items" ref="itemsWrapper" onTransitionEnd={this.onTransitionEnd.bind(this)}>
            {
              this.props.placeImages ?
                this.renderPlaceImages() : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
