/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

const adsSdk = require('facebook-nodejs-ads-sdk');
const AdAccount = adsSdk.AdAccount;
const AdsInsights = adsSdk.AdsInsights;

let access_token = 'EAAfxcGnDphABAORMPrCyuFg9NuMWgbovXnXo7t57YgRr4JROZB5aZAQZA9NSxwXdxXQExX3nYgNrM2dskStAZAnwIs3rZAkkcZCIhg2OZBAgHyPiZBTX3zepXyZCbyCFNuphbp7bedE5wZAlalcP5OZBGxiA3bNyauIyMe98oE0vww52brzqMUynGjO3UaQZB3BUCLIZAnVnWBFeBDGOm6077LLFXrHW9Gdy4Dl8ZD';
let ad_account_id = 'act_708837812826189';
let app_secret = 'ee27d1b333d750eeb1f175740330d6d2';
let app_id = '2235789950035472';
const api = adsSdk.FacebookAdsApi.init(access_token);
const account = new AdAccount(ad_account_id);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

let ads_insights;
let ads_insights_id;

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};

const fields = [
  'results',
  'result_rate',
  'reach',
  'frequency',
  'impressions',
  'delivery',
  'relevance_score:score',
  'spend',
  'impressions_gross',
  'impressions_auto_refresh',
  'cost_per_result',
  'cpp',
  'cpm',
  'actions:page_engagement',
  'actions:like',
  'actions:comment',
  'actions:post_engagement',
  'actions:post_reaction',
  'actions:post',
  'actions:photo_view',
  'actions:rsvp',
  'actions:receive_offer',
  'actions:checkin',
  'cost_per_action_type:page_engagement',
  'cost_per_action_type:like',
  'cost_per_action_type:comment',
  'cost_per_action_type:post_engagement',
  'cost_per_action_type:post_reaction',
  'cost_per_action_type:post',
  'cost_per_action_type:photo_view',
  'cost_per_action_type:rsvp',
  'cost_per_action_type:receive_offer',
  'cost_per_action_type:checkin',
  'unique_video_continuous_2_sec_watched_actions:video_view',
  'video_continuous_2_sec_watched_actions:video_view',
  'actions:video_view',
  'video_10_sec_watched_actions:video_view',
  'video_p25_watched_actions:video_view',
  'video_p50_watched_actions:video_view',
  'video_p75_watched_actions:video_view',
  'video_p95_watched_actions:video_view',
  'video_p100_watched_actions:video_view',
  'video_avg_time_watched_actions:video_view',
  'video_play_actions:video_view',
  'canvas_avg_view_time',
  'canvas_avg_view_percent',
  'cost_per_2_sec_continuous_video_view:video_view',
  'cost_per_action_type:video_view',
  'cost_per_10_sec_video_view:video_view',
  'actions:link_click',
  'unique_actions:link_click',
  'outbound_clicks:outbound_click',
  'unique_outbound_clicks:outbound_click',
  'website_ctr:link_click',
  'unique_link_clicks_ctr',
  'outbound_clicks_ctr:outbound_click',
  'unique_outbound_clicks_ctr:outbound_click',
  'clicks',
  'unique_clicks',
  'ctr',
  'unique_ctr',
  'cost_per_action_type:link_click',
  'cost_per_unique_action_type:link_click',
  'cost_per_outbound_click:outbound_click',
  'cost_per_unique_outbound_click:outbound_click',
  'cpc',
  'cost_per_unique_click',
  'estimated_ad_recallers',
  'estimated_ad_recall_rate',
  'cost_per_estimated_ad_recallers',
  'total_action_value',
  'actions:games.plays',
  'actions:app_engagement',
  'actions:app_install',
  'actions:app_story',
  'actions:app_use',
  'actions:credit_spent',
  'actions:app_custom_event.fb_mobile_achievement_unlocked',
  'actions:app_custom_event',
  'actions:app_custom_event.fb_mobile_add_to_cart',
  'actions:app_custom_event.fb_mobile_add_to_wishlist',
  'actions:app_custom_event.fb_mobile_initiated_checkout',
  'actions:app_custom_event.fb_mobile_content_view',
  'actions:app_custom_event.fb_mobile_d2_retention',
  'actions:app_custom_event.fb_mobile_d7_retention',
  'actions:app_custom_event.fb_mobile_spent_credits',
  'actions:mobile_app_install',
  'actions:app_custom_event.fb_mobile_level_achieved',
  'actions:app_custom_event.fb_mobile_add_payment_info',
  'actions:app_custom_event.fb_mobile_purchase',
  'actions:app_custom_event.fb_mobile_rate',
  'actions:app_custom_event.fb_mobile_complete_registration',
  'actions:app_custom_event.fb_mobile_search',
  'actions:app_custom_event.fb_mobile_activate_app',
  'actions:app_custom_event.fb_mobile_tutorial_completion',
  'actions:app_custom_event.other',
  'unique_actions:app_custom_event.fb_mobile_achievement_unlocked',
  'unique_actions:app_custom_event.fb_mobile_add_to_cart',
  'unique_actions:app_custom_event.fb_mobile_add_to_wishlist',
  'unique_actions:app_custom_event.fb_mobile_initiated_checkout',
  'unique_actions:app_custom_event.fb_mobile_content_view',
  'unique_actions:app_custom_event.fb_mobile_d2_retention',
  'unique_actions:app_custom_event.fb_mobile_d7_retention',
  'unique_actions:app_custom_event.fb_mobile_spent_credits',
  'unique_actions:app_custom_event.fb_mobile_level_achieved',
  'unique_actions:app_custom_event.fb_mobile_add_payment_info',
  'unique_actions:app_custom_event.fb_mobile_purchase',
  'unique_actions:app_custom_event.fb_mobile_rate',
  'unique_actions:app_custom_event.fb_mobile_complete_registration',
  'unique_actions:app_custom_event.fb_mobile_search',
  'unique_actions:app_custom_event.fb_mobile_activate_app',
  'unique_actions:app_custom_event.fb_mobile_tutorial_completion',
  'cost_per_action_type:games.plays',
  'cost_per_action_type:app_engagement',
  'cost_per_action_type:app_install',
  'cost_per_action_type:app_story',
  'cost_per_action_type:app_use',
  'cost_per_action_type:credit_spent',
  'cost_per_action_type:app_custom_event.fb_mobile_achievement_unlocked',
  'cost_per_action_type:app_custom_event',
  'cost_per_action_type:app_custom_event.fb_mobile_add_to_cart',
  'cost_per_action_type:app_custom_event.fb_mobile_add_to_wishlist',
  'cost_per_action_type:app_custom_event.fb_mobile_initiated_checkout',
  'cost_per_action_type:app_custom_event.fb_mobile_content_view',
  'cost_per_action_type:app_custom_event.fb_mobile_d2_retention',
  'cost_per_action_type:app_custom_event.fb_mobile_d7_retention',
  'cost_per_action_type:app_custom_event.fb_mobile_spent_credits',
  'cost_per_action_type:mobile_app_install',
  'cost_per_action_type:app_custom_event.fb_mobile_level_achieved',
  'cost_per_action_type:app_custom_event.fb_mobile_add_payment_info',
  'cost_per_action_type:app_custom_event.fb_mobile_purchase',
  'cost_per_action_type:app_custom_event.fb_mobile_rate',
  'cost_per_action_type:app_custom_event.fb_mobile_complete_registration',
  'cost_per_action_type:app_custom_event.fb_mobile_search',
  'cost_per_action_type:app_custom_event.fb_mobile_activate_app',
  'cost_per_action_type:app_custom_event.fb_mobile_tutorial_completion',
  'cost_per_action_type:app_custom_event.other',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_achievement_unlocked',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_add_to_cart',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_add_to_wishlist',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_initiated_checkout',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_content_view',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_d2_retention',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_d7_retention',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_spent_credits',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_level_achieved',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_add_payment_info',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_purchase',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_rate',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_complete_registration',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_search',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_activate_app',
  'cost_per_unique_action_type:app_custom_event.fb_mobile_tutorial_completion',
  'mobile_app_purchase_roas:app_custom_event.fb_mobile_purchase',
  'action_values:app_custom_event.fb_mobile_content_view',
  'action_values:app_custom_event.fb_mobile_rate',
  'action_values:app_custom_event.fb_mobile_add_to_cart',
  'action_values:app_custom_event.fb_mobile_add_to_wishlist',
  'action_values:app_custom_event.fb_mobile_initiated_checkout',
  'action_values:app_custom_event.fb_mobile_purchase',
  'action_values:app_custom_event.fb_mobile_search',
  'action_values:app_custom_event.fb_mobile_spent_credits',
  'action_values:credit_spent',
  'actions:onsite_conversion.purchase',
  'actions:onsite_conversion.flow_complete',
  'actions:leadgen.other',
  'cost_per_action_type:onsite_conversion.purchase',
  'cost_per_action_type:onsite_conversion.flow_complete',
  'cost_per_action_type:leadgen.other',
  'action_values:onsite_conversion.purchase',
  'action_values:onsite_conversion.flow_complete',
];
const params = {
  'level' : 'account',
  'filtering' : [],
  'breakdowns' : ['monthly','place_page_id','action_reaction','ad_id'],
  'time_range' : {'since':'2018-09-18','until':'2018-10-18'},
};
 (new AdAccount(ad_account_id)).getInsights(
  fields,
  params
)
.then((result) => {
  logApiCallResult('ads_insights api call complete.', result);
  ads_insights_id = result[0].id;
})
.catch((error) => {
  console.log(error);
});
