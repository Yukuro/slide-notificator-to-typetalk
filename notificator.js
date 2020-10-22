function isUpdate(slideId){
    var now = new Date();
    Logger.log("[UPDATE] now -> " + now + " value -> " + now.valueOf());
    
    const slide = DriveApp.getFileById(slideId);
    var last_update = slide.getLastUpdated();
    Logger.log("[UPDATE] last update -> " + last_update + " value -> " + last_update.valueOf());
  
    
    var last_notice = formatstring_to_Date(PropertiesService.getScriptProperties().getProperty("last_notice"));
    Logger.log("[UPDATE] last notice -> " + last_notice + " value -> " + last_notice.valueOf());
    
    var tp = now.valueOf() - last_update.valueOf();
    var tp2 = Math.abs(last_update.valueOf() - last_notice.valueOf())
    Logger.log(tp + " " + tp2);
    if((now.valueOf() - last_update.valueOf()) > 1 * 60 * 1000 && Math.abs(last_update.valueOf() - last_notice.valueOf()) > 1 * 1000){
      //format for get Property
      last_notice = Utilities.formatDate(last_update, "JST", "yyyy,MM,dd,HH,mm,ss");
      PropertiesService.getScriptProperties().setProperty("last_notice", last_notice);
      Logger.log("[UPDATE] set last_notice -> " + formatstring_to_Date(PropertiesService.getScriptProperties().getProperty("last_notice")));
      
      Logger.log("[UPDATE] update detected...");
      return true; 
    }
    Logger.log("[UPDATE] update did not detected...");
    return false;
  }
  
  function get_share_link(slideId){
    const presentation_file = DriveApp.getFileById(slideId);
    
    var access = DriveApp.Access.ANYONE_WITH_LINK;
    var permission = DriveApp.Permission.VIEW;
    
    //presentation_file.setSharing(access, permission);
    
    const presentation = SlidesApp.openById(slideId);
    
    var slides = presentation.getSlides();
    var latest_slideId = slides.slice(-1)[0].getObjectId();
    Logger.log("[SHARE] latest -> " + slides.slice(-1)[0].getObjectId());
    
    const share_link = "https://docs.google.com/presentation/d/" + slideId + "/edit#slide=id." + latest_slideId;
    return share_link;
  }
  
  function formatstring_to_Date(format_string_date){
    var parsed_dates = format_string_date.split(",");
    Logger.log("[DEBUG] parsed dates " + parsed_dates);
    var date = new Date(parsed_dates[0], parsed_dates[1] - 1, parsed_dates[2], parsed_dates[3], parsed_dates[4], parsed_dates[5]);
    return date;
  }
  
  function notify_to_typetalk(message){
     var payload =
     {
       "message" : message
     };
  
     var options =
     {
       "method" : "post",
       "payload" : payload,
       "headers": {"X-TYPETALK-TOKEN" : "[[YOUR_BOT_TOKEN]]"}
     };
  
     UrlFetchApp.fetch("[[YOUR_CHANNEL_ID_URL]]", options);
  }
  
  function myFunction() {
    const slideId = "[[YOUR_SLIDE_ID]]";
    const share_link = get_share_link(slideId);
    Logger.log("[MAIN] share link --> " + share_link);
    if(isUpdate(slideId)){
      Logger.log("[MAIN] notify to typetalk...");
      notify_to_typetalk("レポートが更新されました。\n [最新のスライド](" + share_link + ") by [[YOUR_NAME]]");
    }
  }
  