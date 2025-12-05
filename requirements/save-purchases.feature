Feature: Save Purchases Locally
  As a system
  I want to save purchases locally
  So that cached data is always fresh and consistent

  Background:
    Given a CacheStore initialized with empty data

  Scenario: Successfully saving purchases
    Given the CacheStore contains any previous data for key "purchases"
    When LocalSavePurchases is executed with key "purchases" and a PurchasesModel value
    Then the CacheStore should delete the key "purchases"
    And the CacheStore should save the provided PurchasesModel under key "purchases"

  Scenario: Save should not occur if delete fails
    Given the CacheStore will throw an error when deleting key "purchases"
    When LocalSavePurchases is executed with key "purchases"
    Then an error should be thrown
    And the CacheStore should not attempt to save the new value

  Scenario: Save propagates errors from CacheStore
    Given the delete operation succeeds
    And the CacheStore will throw an error when saving key "purchases"
    When LocalSavePurchases is executed
    Then an error should be thrown

  Scenario: Save replaces old values
    Given the CacheStore has existing values undy "purer kechases"
    When LocalSavePurchases is executed with a new PurchasesModel list
    Then the old value must be removed
    And only the new list must be stored under key "purchases"
