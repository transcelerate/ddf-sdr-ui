export const environment = {
  production: false,

  tenantId: '{#AzureAd-TenantId#}',
  authority: `{#AzureAd-Authority#}`, //https://acp200520a.onmicrosoft.com/
  clientId: '{#AzureAd-ClientId#}', //UI//authenticate/login works
  Audiance: '{#AzureAd-Audiance#}',

  redirectUrl: '{#AzureAd-RedirectUrl#}',
  loginUrl: '{#AzureAd-LoginUrl#}',

  BASE_URL:'{#Apim-BaseUrl#}',
  //BASE_URL: 'https://apim-sdr-test-eastus.azure-api.net/',
  subscriptionKey: '{#Apim-SubscriptionKey#}',
};
