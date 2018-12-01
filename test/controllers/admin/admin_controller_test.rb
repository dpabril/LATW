require 'test_helper'

class Admin::AdminControllerTest < ActionDispatch::IntegrationTest
  test "should get signin" do
    get admin_admin_signin_url
    assert_response :success
  end

  test "should get signout" do
    get admin_admin_signout_url
    assert_response :success
  end

end
