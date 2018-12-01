require 'net/http'

class ApplicationController < ActionController::Base
    def current_user
        if session[:username]
            admin = ActiveRecord::Base.connection.exec_query(
                "
                SELECT username
                FROM Admin
                WHERE username = '%s';
                " % session[:username]
                )[0]
        else
            nil
        end
    end
    def signed_in
        current_user.present?
    end
    def jsonify(jsonable)
        return jsonable.to_json
    end
    def getWikipediaExtract(wikipage)
        # apiResponse = Net::HTTP.get_response(URI("https://en.wikipedia.org/api/rest_v1/page/summary/%s" % wikipage.gsub(" ", "_").gsub("-", "_")))
        apiResponse = Net::HTTP.get_response(URI("https://en.wikipedia.org/api/rest_v1/page/summary/%s" % wikipage.gsub(" ", "_") ))
        if apiResponse.code.to_i == 200
            extract = JSON.parse(apiResponse.body)["extract"]
            return extract[-1] == '.' ? extract : extract + '.'
        else
            return nil
        end
    end

    helper_method :signed_in
end
