class MethodFinderController < ApplicationController
  def index
    @methods = ExtractMethodExample.perform
  end
end
