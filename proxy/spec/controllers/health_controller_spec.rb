require "rails_helper"

RSpec.describe HealthController, type: :controller do
  describe "GET authorize" do
    before do
      get :index
    end

    it "returns a 200" do
      expect(response).to have_http_status(:ok)
    end
  end
end
