export class Reward {
  constructor({
    id = ``,
    brand_id = ``,
    winners_description = ``,
    lottery_style = ``,
    lottery_ratio = ``,
    active = ``,
    delivery_method = ``,
    cash_value = ``,
    fee = ``,
    winners_banner = ``,
    default_description = ``,
    default_redeem_link = ``,
    default_banner = ``,
    default_banner_width = ``,
    default_banner_height = ``,
    winners_banner_width = ``,
    winners_banner_height = ``,
    data = ``,
    created_at = ``,
    updated_at = ``
  } = {}) {
    this.id = id;
    this.brand_id = brand_id;
    this.winners_description = winners_description;
    this.lottery_style = lottery_style;
    this.lottery_ratio = lottery_ratio;
    this.active = active;
    this.delivery_method = delivery_method;
    this.cash_value = cash_value;
    this.fee = fee;
    this.winners_banner = winners_banner;
    this.default_description = default_description;
    this.default_redeem_link = default_redeem_link;
    this.default_banner = default_banner;
    this.default_banner_width = default_banner_width;
    this.default_banner_height = default_banner_height;
    this.winners_banner_width = winners_banner_width;
    this.winners_banner_height = winners_banner_height;
    this.data = data;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export function createReward(data) {
  return new Reward(data);
}

export function createRewards(rewards = []) {
  var rewardList = [];
  rewards.forEach(r => {
    rewardList.push(createReward(r));
  });
  return rewardList;
}

export function createRewardFormData(reward) {
  let formData = new FormData();
  formData.append('reward[brand_id]', reward.brand_id);
  formData.append('reward[delivery_method]', reward.delivery_method);
  formData.append('reward[lottery_ratio]', reward.lottery_ratio);
  formData.append('reward[winners_description]', reward.winners_description);
  formData.append('reward[winners_redeem_link]', reward.winners_redeem_link);
  formData.append('reward[winners_banner]', reward.winners_banner);
  formData.append('reward[default_description]', reward.default_description);
  formData.append('reward[default_redeem_link]', reward.default_redeem_link);
  formData.append('reward[default_banner]', reward.default_banner);
  return formData;
}
