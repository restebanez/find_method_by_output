module Api
  module V0
    class MethodExamplesController < ApplicationController
      def index
        render(json: JSON.pretty_generate(methodExamples:  ExtractMethodExample.perform))
      end
    end
  end
end
