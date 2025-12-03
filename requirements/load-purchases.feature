Feature: Load Purchases Locally
  As a system
  I want to load purchases stored locally
  So that I can retrieve cached purchase data

  Background:
    Given a CacheStore initialized with some data

  Scenario: Successfully loading purchases
    Given the CacheStore has a list of PurchasesModel under key "purchases"
    When LocalLoadPurchases loads key "purchases"
    Then it should return the stored PurchasesModel list

  Scenario: Loading purchases when cache is empty
    Given the CacheStore has no data under key "purchases"
    When LocalLoadPurchases loads key "purchases"
    Then it should return an empty list

  Scenario: Should propagate errors from CacheStore
    Given the CacheStore will throw an error when fetching key "purchases"
    When LocalLoadPurchases loads key "purchases"
    Then an error should be thrown
