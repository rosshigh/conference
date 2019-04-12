export class ReviewersValueConverter {
  toView(value, reviewers) {
    if (!value) return [];
    var reviewerArray = [];
    var nonReviewerArray = [];
    value.forEach(item => {
      if (item.role.indexOf('reviewer') > -1) {
        reviewerArray.push(item);
      } else {
        nonReviewerArray.push(item);
      }
    })
    if (reviewers) {
      return reviewerArray;
    } else {
      return nonReviewerArray
    }
  }

  fromView(value) {

  }
}

