export class AvailableReviewersValueConverter {
    toView(value, reviewers) {
        if(!value || !reviewers) return [];
        let availableReviewers = [];
        value.forEach(item => {
            if (item.role.indexOf('reviewer') > -1) {
                var keep = true;
                reviewers.forEach(item2 => {
                    if(item2._id === item._id) keep = false;
                });
            }
            if(keep) availableReviewers.push(item);
        })
        return availableReviewers;
    }
}