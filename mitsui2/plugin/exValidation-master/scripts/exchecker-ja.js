/*!
 * exchecker-ja
 *
 * @version   : 1.1
 * @author    : nori (norimania@gmail.com)
 * @copyright : 5509 (http://5509.me/)
 * @license   : The MIT License
 * @link      : http://5509.me/log/exvalidation
 * @modified  : 2012-04-09 16:52
 */
;(function($) {

      function chkretypeFunc(txt, t, type) {
        var splitTxt = "";
        switch (type) {
          case "email":
            splitTxt = "retype_email";
            break;
          case "pass":
            splitTxt = "retype_pass";
            break;
          case "none":
            splitTxt = "retype_none";
            break;
          case "date":
            splitTxt = "retype_date";
            break;
          case "future":
            splitTxt = "retype_future";
            break;
          default :
            splitTxt = "retype";
            break;
        }

        var elm = $("#" + $(t).attr("class").split(splitTxt+"\-")[1].split(/\b/)[0]);
        // var elm = $("#" + $(t).attr("class").split("retype\-")[1].split(/\b/)[0]);
        console.log(0+splitTxt)
        if ( elm.hasClass("chkgroup") ) {
          console.log(1)
          var chktxt = $("input", elm), txt = $("input", t);
            for ( var i = 0, flag = false; i < chktxt.length; i++ ) {
              if ( chktxt[i].value === txt[i].value ) {
                flag = true;
              } else {
                flag = false;
                break;
              }
          }
          if ( flag ) return true;
        } else {
          if(splitTxt == 'retype_date'){
            console.log(2+splitTxt)
//elm.val()は確認照会される元のval txtはイベントが起こった確認用のval
            var isCorrect = true;
            if(txt == 29){
              // if((elm.val() == 2)&&(
              //   ($('#userbirthyear').val())
              //   &&(($('#userbirthyear').val()-0)%4 == 0)
              // )){//2月
              if(elm.val() == 2){
//ここからセレクタが三井仕様　専用
                if($('#userbirthyear').val()){
                 if(($('#userbirthyear').val()-0)%4 != 0){
                    isCorrect = false;
                  }
                }
              }
//ここまでセレクタが三井仕様　専用
            } else if(txt == 30){
              if(elm.val() == 2){//2月
                isCorrect = false;
              }
            } else if (txt == 31){
              switch (elm.val()-0) {
                case 2:
                  isCorrect = false;
                  break;
                case 4:
                  isCorrect = false;
                  break;
                case 6:
                  isCorrect = false;
                  break;
                case 9:
                  isCorrect = false;
                  break;
                case 11:
                  isCorrect = false;
                  break;
                default :
                  break;
              }
            }
            return isCorrect;

          } else if(splitTxt == 'retype_future'){
            var isCorrect = true;
            var dt1 = new Date($('#userbirthyear').val()-0, elm.val()-1, txt);
            var dt2 = new Date();
            if(dt1.getTime() > dt2.getTime()) {
              isCorrect = false
            }
            return isCorrect;
          } else{
            console.log(3+splitTxt)
            return elm.val() == txt;
          }
        }
      }


  // Extend validation rules
  $.exValidationRules = $.extend($.exValidationRules, {
    chkrequired: [
      "必須入力",
      function(txt, t) {
        if ( $(t).hasClass("chkgroup") ) {
          var flag = 0;
          $("input,select",t).each(function() {
            if ( $(this).val().length > 0 ) flag++;
          });
          if ( txt && flag === $("input,select", t).length ) {
            if ( /^[ 　\r\n\t]+$/.test(txt) ) {
              return false;
            } else {
              return true;
            }
          }
        } else {
          if ( txt && txt.length>0 ) {
            if ( /^[ 　\r\n\t]+$/.test(txt) ) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    ],
    chkselect: [
      "選択してください",
      function(txt, t) {
        if ( txt && txt.length>0 ) {
          if ( /^[ 　\r\n\t]+$/.test(txt) ) {
            return false;
          } else {
            return true;
          }
        }
      }
    ],
    chkselect0: [//0を含めるパターン
      "選択してください",
      function(txt, t) {
        if ( txt && txt.length>0 ) {
          if ( /^[ 　\r\n\t]+$/.test(txt) ) {
            return false;
          } else if(txt == 0||txt == 00){
            return false;
          } else {
            return true;
          }
        }
      }
    ],
    chkdepend: [
      "規定文字以外が入力されています",//sato
        function (txt,t){
          var cRegP = "[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]";
          if (txt.match(cRegP)) {
            return false;
          } else {
            return true;
          }
        }
    ],
    chkretype_none: [
      "上記と一致していません",//sato
      function(txt,t){
        return chkretypeFunc(txt,t,"none");
      }
    ],
    chkretype_email: [
      "上記のメールアドレスと一致していません",//sato
      function(txt,t){
        return chkretypeFunc(txt,t,"email");
      }
    ],
    chkretype_pass: [
      "上記のパスワードと一致していません",//sato
      function(txt,t){
        return chkretypeFunc(txt,t,"pass");
      }
    ],
    chkretype_date: [
      "存在しない日付が指定されています",//sato
      function(txt,t){
        return chkretypeFunc(txt,t,"date");
      }
    ],
    chkretype_future: [
      "生年月日に未来日は指定できません",//sato
      function(txt,t){
        return chkretypeFunc(txt,t,"future");
      }
    ],
    chkemail: [
      "正しいメールアドレスの形式を入力してください",
      /^(?:[^\@]+?@[A-Za-z0-9_\.\-~]+\.+[A-Za-z\.\-\_~]+)*$/ //チルド全許可
      // /^(?:[^\@]+?@[A-Za-z0-9_\.\-]+\.+[A-Za-z\.\-\_]+)*$/
    ],
    chkemail2: [
      "正しいメールアドレスの形式を入力してください",
      // /^(([0-9a-zA-Z\.\-_\/]{1,50})@[[0-9a-zA-Z\.\-_\/]+\.+[0-9a-zA-Z\.\-_\/]]{3,50})$/ //チルド全許可
      /^(([0-9a-zA-Z\.\-_\/]{1,50})@[A-Za-z0-9_\.\-~]+\.+[A-Za-z\.\-\_~]+)*$/ //チルド全許可
      // /^(?:[^\@]+?@[A-Za-z0-9_\.\-]+\.+[A-Za-z\.\-\_]+)*$/
    ],
    chkemailBefore: [
      "正しいメールアドレスの形式を入力してください",
      /^[0-9a-zA-Z\.\-_\/]{1,50}$/ //三井ルール
      // /^[a-zA-Z0-9\.\!#\$%&'\*\+\/=\?_`\{\|\}\-]+$/ //html5基準ー^~
      // /^[a-zA-Z0-9\.\!#\$%&'\*\+\/=\?_`\{\|\}~\-^]+$/ //html5基準
      // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/ //html5基準
      // /^(?:[^\@])*$/ //チルド全許可
      // /^(?:[^\@]+?@[A-Za-z0-9_\.\-]+\.+[A-Za-z\.\-\_]+)*$/
    ],
    chkemailAfter: [
      "正しいメールアドレスの形式を入力してください",
      /^[0-9a-zA-Z\.\-_\/]{1,50}$/ //三井ルール
      // /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ //html5基準
      // /^(?:[A-Za-z0-9_\.\-~]+\.+[A-Za-z\.\-\_~]+)*$/ //チルド全許可
      // /^(?:[A-Za-z0-9_\.\-~]+\.+[A-Za-z\.\-\_~]+)*$/ //チルド全許可
      // /^(?:[^\@]+?@[A-Za-z0-9_\.\-]+\.+[A-Za-z\.\-\_]+)*$/
    ],
    chkhankaku: [
      "全角文字は使用できません",
      // /^(?:[a-zA-Z0-9@\<\>\;\:\[\]\{\}\|\=\/\!\*\`\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]*)*$/
      /^(?:[a-zA-Z0-9@~\<\>\;\:\[\]\{\}\|\^\=\/\!\*\`\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]*)*$/ //チルド許可
    ], //"
    chkzenkaku: [
      "全角文字で入力してください",
      /^(?:[^a-zA-Z0-9@\<\>\;\:\[\]\{\}\|\^\=\/\!\*\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]+)*$/
    ],
    chkhiragana: [
      "ひらがなで入力してください",
      /^(?:[ぁ-ゞ]+)*$/
    ],
    chkkatakana: [
      "全角カタカナで入力してください",
      /^(?:[ァ-ヾ]+)*$/
    ],
    chkfurigana: [
      "ふりがなはひらがな、全角数字と〜、ー、（）が利用できます",
      /^(?:[ぁ-ゞ０-９ー～（）\(\)\d 　]+)*$/
    ],
    chknochar: [
      "英数字で入力してください",
      /^(?:[a-zA-Z0-9]+)*$/
    ],
    chknocharUnsco: [
      "半角英数字またはアンダーバーで入力してください",
      /^(?:[_a-zA-Z0-9]+)*$/
    ],
    chkfirstABC: [
      "最初の文字はアルファベットではじめてください",
      /^[a-zA-Z]/
    ],
    chknocaps: [
      "英数字(小文字のみ)で入力してください",
      /^(?:[a-z0-9]+)*$/
    ],
    chknumonly: [
      "半角数字で入力してください",
      /^(?:[0-9]+)*$/
    ],
    chktelmin10: [
      "電話番号を正しく入力してください",
      /^$|(^.{10}.*)/
    ],
    chktelmin11: [
      "電話番号を正しく入力してください",
      /^$|(^.{11}.*)/
    ],
    chknumonlyUnsco: [
      "半角数字またはアンダーバーで入力してください",
      /^(?:[_0-9]+)*$/
    ],
    chkyear: [
      "正しく入力してください",
      /^19\d{2}$|2\d{3}$/
    ],
    chkmonth: [
      "正しく入力してください",
    /^[1-9]$|0[1-9]$|1[0-2]$/
    ],
    chkday: [
      "正しく入力してください",
     /^[1-9]$|0[1-9]$|[12]\d$|3[01]$/
    ],
    chktime: [
      "正しく入力してください",
     /^[1-9]$|0[1-9]$|1\d$|2[0-4]$/
    ],
    chkage: [
      "正しく入力してください",
     /^\d$|0\d$|[1-9]\d$/
    ],
    chk3num: [
      "３桁で入力してください",
     // /^(\d{3})|(\d{0})$/
     // /^\d{3}$/
     /(^\d{3}$)|^$/
    ],
    chk4num: [
      "４桁で入力してください",
     // /^(\d{4})|(\d{0})$/
     // /^\d{4}$/
     /(^\d{4}$)|^$/
    ],
    chkmin: [
      "文字で入力してください",//sato
      function(txt, t) {
        if ( txt.length === 0 ) return true;
         var length = $(t).attr("class").match(/min(\d+)/) ? RegExp.$1 : null;
        return txt.length >= length;
      }
    ],
    chkmax: [
      "文字以内で入力してください",
      function(txt, t) {
        var length = $(t).attr("class").match(/max(\d+)/) ? RegExp.$1 : null;
        return txt.length <= length;
      }
    ],
    chkradio: [
      "選択してください",
      function(txt, t) {
        return $("input:checked",t).length>0;
      }
    ],
    chkcheckbox: [
      "選択してください",
      function(txt, t) {
        return $("input:checked",t).length>0;
      }
    ],
    chkzip: [
      "正しい郵便番号の形式を入力してください",
      /^(?:\d{3}-?\d{4}$|^\d{3}-?\d{2}$|^\d{3}$)*$/
    ],
    chkurl: [
      "正しいURLの形式を入力してください",
      /^(?:(?:ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)*$/
    ],
    chktel: [
      "正しい電話番号を入力してください",
      /^(?:\(?\d+\)?\-?\d+\-?\d+)*$/
    ],
    chkfax: [
      "正しいファックス番号を入力してください",
      /^(?:\(?\d+\)?\-?\d+\-?\d+)*$/
    ],
    chkfile: [
      "ファイルを選択してください",
      function(txt, t) {
        if ( txt && txt.length>0 ) {
          if ( /^[ 　\r\n\t]+$/.test(txt) ) {
            return false;
          } else {
            return true;
          }
        }
      }
    ]
  });
})(jQuery);

