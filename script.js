$(document).ready(function() {
    // Toggle sidebar collapse
    $("#sidebar-toggle").click(function() {
      $("#sidebar").toggleClass("collapsed");
      $("#main").toggleClass("expanded");
    });
  
    // Switch active category
    $(".category").click(function() {
      $(".category").removeClass("active");
      $(this).addClass("active");
  
      var category = $(this).text().toLowerCase();
  
      if (category === "all") {
        $(".note").show();
        $(".category-title").text("All Notes");
      } else {
        $(".note").hide();
        $(".note[data-category='" + category + "']").show();
        $(".category-title").text(category + " Notes");
      }
    });
  
    // Save note
    $("#save-btn").click(function() {
      var title = $("#note-title").val();
      var content = $("#note-content").val();
      var category = $(".category.active").text().toLowerCase();
  
      if (title && content) {
        var noteHtml = "<li class='note' data-category='" + category + "'>" +
          "<h3 class='note-title'>" + title + "</h3>" +
          "<p class='note-content'>" + content + "</p>" +
          "<span class='note-date'>" + getCurrentDate() + "</span>" +
          "</li>";
  
        $("#note-list").append(noteHtml);
  
        $("#note-title").val("");
        $("#note-content").val("");
      }
    });
  
    // Show note details
    $(document).on("click", ".note", function() {
      var title = $(this).find(".note-title").text();
      var content = $(this).find(".note-content").text();
  
      $("#note-details-title").text(title);
      $("#note-details-content").text(content);
  
      $("#note-details-modal").fadeIn();
    });
  
    // Close note details modal
    $("#note-details-close").click(function() {
      $("#note-details-modal").fadeOut();
    });
  
    // Generate current date in format YYYY-MM-DD
    function getCurrentDate() {
      var now = new Date();
      var year = now.getFullYear();
      var month = String(now.getMonth() + 1).padStart(2, "0");
      var day = String(now.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    };
     // Edit note
        $(document).on('click', '.edit-note', function() {
          var note = $(this).closest('.note');
          var title = note.find('.note-title').text();
          var content = note.find('.note-content').text();
      
          $('#editor-title').val(title);
          $('#editor-content').val(content);
      
          $('#editor-modal').fadeIn(300);
        });
      
        // Save edited note
        $('#save-btn').click(function() {
          var editedTitle = $('#editor-title').val();
          var editedContent = $('#editor-content').val();
      
          $('.note.active .note-title').text(editedTitle);
          $('.note.active .note-content').text(editedContent);
      
          $('#editor-modal').fadeOut(300);
        });
      
        // Delete note
        $(document).on('click', '.delete-note', function() {
          var note = $(this).closest('.note');
          note.fadeOut(300, function() {
            note.remove();
          });
        });
      });
      