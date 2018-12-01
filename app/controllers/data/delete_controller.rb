class Data::DeleteController < CheckpointController
    def language
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM Language
            WHERE ISOid = '%s';
            " % params[:isoID]
            )
        response[:message] = "Language successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200
    end
    def dialect
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM Dialect
            WHERE ISOid = '%s'
              AND name = '%s';
            " % [params[:langID], stripsub(params[:name])]
            )
        response[:message] = "Dialect successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200 
    end
    def family
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM LanguageFamily
            WHERE name = '%s';
            " % stripsub(params[:name])
            )
        response[:message] = "Language family successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200
    end
    def script
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM Script
            WHERE ISOid = '%s';
            " % params[:isoID]
            )
        response[:message] = "Script successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200
    end
    def country
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM Country
            WHERE ISOid = '%s';
            " % params[:isoID]
            )
        response[:message] = "Country successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200
    end
    def belongsto
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM languageBelongsTo
            WHERE langID = '%s';
            " % params[:langID]
            )
        response[:message] = "Relationship successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200
    end
    def isanationallanguageof
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            UPDATE isSpokenIn
            SET isNational = FALSE
            WHERE langID = '%s'
              AND countryID = '%s';
            " % [params[:langID], params[:countryID]]
            )
        response[:message] = "Relationship successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200
    end
    def isspokenin
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM isSpokenIn
            WHERE langID = '%s'
              AND countryID = '%s';
            " % [params[:langID], params[:countryID]]
            )
        response[:message] = "Relationships successfully deleted."
        response[:status] = 200
        render :json => jsonify(response), :status => 200
    end
    def uses
        response = {}
        ActiveRecord::Base.connection.exec_query(
            "
            DELETE FROM languageUsesScript
            WHERE langID = '%s'
              AND scriptID = '%s';
            " % [params[:langID], params[:scriptID]]
            )
        response[:message] = "Relationship successfully deleted."
        response[:status] = 200
        puts response
        render :json => jsonify(response), :status => 200
    end
end
