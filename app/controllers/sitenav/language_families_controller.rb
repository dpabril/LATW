class Sitenav::LanguageFamiliesController < ApplicationController
  def index
    puts "Language Family Index"
    query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT name
        FROM LanguageFamily;
        "
        )
    @index_list = {}
    for lfam in query.to_hash.sort_by { |row| row["name"] } do
        if !@index_list.key?(lfam["name"][0])
            @index_list[lfam["name"][0]] = [lfam]
        else
            @index_list[lfam["name"][0]].push(lfam)
        end
    end
  end
  def one
    @lfname = params[:name]
    # Querying for the language family specified by @lfname
    @lfam_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT *
        FROM LanguageFamily
        WHERE name = '%s';
        " % @lfname
        )[0]
    if @lfam_query.blank?
        # render 404
        # return
    elsif @lfam_query["info"].blank?
        @lfam_query["info"] = "There has yet to be an informative description on this language family."
    end
    # Querying for the languages that belong to the language family
    @langs_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Language
        WHERE ISOid IN (SELECT langID
                        FROM languageBelongsTo
                        WHERE lfamID = '%s');
        " % @lfname
        )
    if @langs_query.present?
        @langs_query.to_hash.sort_by! { |row| row["name"] }
    end
    
    # Admin
    if signed_in
        languages_for_add_to_family = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Language
            WHERE ISOid NOT IN (SELECT langID
                                FROM languageBelongsTo);
            " % @lfname
            )
        if languages_for_add_to_family.present?
            @languages_for_add_to_family = ""
            languages_for_add_to_family.to_hash.sort_by! { |row| row["name"] }
            languages_for_add_to_family.each do |language|
                @languages_for_add_to_family += "<option value=\"%s\">%s</option>" % [language["isoid"], language["name"]]
            end
        end
    end
  end
end
