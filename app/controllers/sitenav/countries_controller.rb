class Sitenav::CountriesController < ApplicationController
  def index
    puts "Country Index"
    query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Country;
        "
        )
    @index_list = {}
    for country in query.to_hash.sort_by { |row| row["name"] } do
        if !@index_list.key?(country["name"][0])
            @index_list[country["name"][0]] = [country]
        else
            @index_list[country["name"][0]].push(country)
        end
    end
  end
  def one
    @isoID = params[:id]
    # Querying for the country specified by @isoID
    @country_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT *
        FROM Country
        WHERE ISOid = '%s';
        " % @isoID
        )[0]
    if @country_query.blank?
    # render :status => 404
    end
    # Extracting a summary of information about the country through Wikipedia's ReST API
    @country_extract = getWikipediaExtract(@country_query["name"])
    @natlangs_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT *
        FROM Language
        WHERE ISOid IN (SELECT langID
                        FROM isSpokenIn
                        WHERE countryID = '%s'
                          AND isNational = true);
        " % @isoID
        )
    # Querying for languages spoken in the country as defined by the isSpokenIn relation
    @spklangs_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT *
        FROM Language
        WHERE ISOid IN (SELECT langID
                        FROM isSpokenIn
                        WHERE countryID = '%s');
        " % [@isoID, @isoID]
        )
    if @natlangs_query.present?
        @natlangs_query.to_hash.sort_by! { |row| row["name"] }
    end
    if @spklangs_query.present?
        @spklangs_query.to_hash.sort_by! { |row| row["name"] }
    end
    # Admin
    if signed_in
        languages_list_for_add_national = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Language
            WHERE ISOid NOT IN (SELECT langID
                                FROM isSpokenIn
                                WHERE countryID = '%s'
                                  AND isNational = TRUE);
            " % @isoID
            )
        languages_list_for_add_spoken = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Language
            WHERE ISOid NOT IN (SELECT langID
                                FROM isSpokenIn
                                WHERE countryID = '%s');
            " % @isoID
            )
        if languages_list_for_add_national.present?
            @languages_list_for_add_national = ""
            languages_list_for_add_national.to_hash.sort_by! { |row| row["name"] }
            languages_list_for_add_national.each do |language|
                @languages_list_for_add_national += "<option value=\"%s\">%s</option>" % [language["isoid"], language["name"]]
            end
        end
        if languages_list_for_add_spoken.present?
            @languages_list_for_add_spoken = ""
            languages_list_for_add_spoken.to_hash.sort_by! { |row| row["name"] }
            languages_list_for_add_spoken.each do |language|
                @languages_list_for_add_spoken += "<option value=\"%s\">%s</option>" % [language["isoid"], language["name"]]
            end
        end
    end
  end
end