require 'test_helper'

class MethodFinderControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get method_finder_index_url
    assert_response :success
  end

end
