class Sitenav::ScriptsController < ApplicationController
  def index
    puts "Script Index"
    query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Script;
        "
        )
    @index_list = {}
    for script in query.to_hash.sort_by { |row| row["name"] } do
        if !@index_list.key?(script["name"][0])
            @index_list[script["name"][0]] = [script]
        else
            @index_list[script["name"][0]].push(script)
        end
    end
  end
  def one
    @isoID = params[:id]
    # Querying for the script specified by @isoID
    @script_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT *
        FROM Script
        WHERE ISOid = '%s';
        " % @isoID
        )[0]
    if @script_query.blank?
        # render 404
        # return
    end
    # @script_hasCase = @script_query["hasCase"] == "yes" ? true : false
    # Querying for languages that use the script as defined by the languageUsesScript relation
    @langs_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Language
        WHERE ISOid IN (SELECT langID
                        FROM languageUsesScript
                        WHERE scriptID = '%s');
        " % @isoID
        )
    if @langs_query.present?
        @langs_query.to_hash.sort_by! { |row| row["name"] }
    end
    puts "Displaying script page for %s" % @script_query["name"]
    
    # Admin
    if signed_in
        languages_list_for_add_written = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Language
            WHERE ISOid NOT IN (SELECT langID
                                FROM languageUsesScript
                                WHERE scriptID = '%s');
            " % @isoID
            )
        if languages_list_for_add_written.present?
            @languages_list_for_add_written = ""
            languages_list_for_add_written.to_hash.sort_by! { |row| row["name"] }
            languages_list_for_add_written.each do |language|
                @languages_list_for_add_written += "<option value=\"%s\">%s</option>" % [language["isoid"], language["name"]]
            end
        end
    end
  end
end
