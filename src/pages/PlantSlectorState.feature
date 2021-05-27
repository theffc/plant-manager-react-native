Feature: Plant Selector State

  Scenario: First successful data load
    Given state is 'initialState'
    When the first server response arrives with success
    Then should have filter with all plants

  Scenario: Selecting an environment
    Given it has succesfully loaded data
    When I select the 'bathroom' environment
    Then should show just plants of that environment