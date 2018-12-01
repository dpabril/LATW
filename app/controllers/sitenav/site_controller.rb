class Sitenav::SiteController < ApplicationController
  def home
    @languageList = ["Bahasa", "Harshe", "Idioma", "Jazyk", "Kieli",
                     "Langue", "Llenguatge", "Linguaggio", "Língua", "'Ōlelo",
                     "Sprache", "Teanga", "Tungumál", "Wika", "语言",
                     "言語", "زبان", "Γλώσσα", "язык", "언어",
                     "ენა", "भाषा", "لغة", "ٻولي", "ભાષા","ภาษา"
                    ].shuffle
  end
  def search
    @search_key = params["site-search-field"]
    @search_results = {}
    @search_results_count = 0
    @search_sections = [["Languages", "/languages"], ["Language Families", "/families"], ["Scripts", "/scripts"], ["Countries", "/countries"]]
    search_sections = {
      0 => ["Languages", "/languages"],
      1 => ["Language Families", "/families"],
      2 => ["Scripts", "/scripts"],
      3 => ["Countries", "/countries"]
    }
    if @search_key.blank?
      puts "No search key entered"
      redirect_to request.referrer
    else
      queries = []
      queries[0] = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Language
        WHERE name ILIKE '%s%%'
          OR ISOid ILIKE '%s%%';
        " % [@search_key, @search_key]
        ).to_hash.sort_by { |row| row["name"] }
      queries[1] = ActiveRecord::Base.connection.exec_query(
        "
        SELECT name
        FROM LanguageFamily
        WHERE name ILIKE '%s%%';
        " % [@search_key, @search_key]
        ).to_hash.sort_by { |row| row["name"] }
      queries[2] = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Script
        WHERE name ILIKE '%s%%'
          OR ISOid ILIKE '%s%%';
        " % [@search_key, @search_key]
        ).to_hash.sort_by { |row| row["name"] }
      queries[3] = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Country
        WHERE name ILIKE '%s%%'
          OR ISOid ILIKE '%s%%';
        " % [@search_key, @search_key]
        ).to_hash.sort_by { |row| row["name"] }
      for i in 0..(queries.length - 1)
        if queries[i].present?
          @search_results[search_sections[i]] = queries[i]
          @search_results_count += queries[i].length
        end
      end
    end
    puts @search_results
  end
end
