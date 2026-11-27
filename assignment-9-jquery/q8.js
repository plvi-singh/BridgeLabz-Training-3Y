$(document).ready(function () {
  let postCounter = 6;

  // Helper to build a new blog post element
  function createPostElement(titleText, bodyText, isFeatured) {
    const $post = $('<article class="blog-post"></article>');
    if (isFeatured) {
      $post.addClass("featured");
    }
    const $title = $('<h2 class="post-title"></h2>').text(titleText);
    const $body = $('<p class="post-body"></p>').text(bodyText);
    return $post.append($title, $body);
  }

  // Scenario 1: "Add New Post" -> append a new post to the bottom of the list
  $("#btn-add-post").on("click", function () {
    const customTitle = $.trim($("#post-title-input").val());
    const title = customTitle || "New Admin Update #" + postCounter++;
    const $post = createPostElement(
      title,
      "Published dynamically to the bottom of the blog feed using .append().",
      false
    );
    $("#blog-posts-container").append($post);
    $("#post-title-input").val("");
  });

  // Scenario 2: "Prepend Featured Post" -> add a featured post at the top
  $("#btn-prepend-featured").on("click", function () {
    const customTitle = $.trim($("#post-title-input").val());
    const title = customTitle || "Featured Spotlight #" + postCounter++;
    const $post = createPostElement(
      "★ " + title,
      "Pinned at the top of the blog feed using .prepend().",
      true
    );
    $("#blog-posts-container").prepend($post);
    $("#post-title-input").val("");
  });

  // Scenario 3: "Remove Last Post" -> delete the last post element from the list
  $("#btn-remove-last").on("click", function () {
    const $posts = $("#blog-posts-container .blog-post");
    if ($posts.length > 0) {
      $posts.last().remove();
    } else {
      alert("There are no posts left to remove.");
    }
  });

  // Scenario 4: Add tags to posts using .before() and .after() for placement
  $("#btn-add-tag").on("click", function () {
    const tagText = $.trim($("#tag-input").val()) || "#jQuery";
    const $posts = $("#blog-posts-container .blog-post");

    $posts.each(function () {
      const $title = $(this).find(".post-title");
      const $body = $(this).find(".post-body");
      // Place category badge before the post title using .before()
      $title.before($('<span class="post-tag"></span>').text(tagText));
      // Place timestamp/status tag after the post body using .after()
      $body.after($('<span class="post-tag after-tag"></span>').text("Tagged: " + tagText));
    });

    $("#tag-input").val("");
  });

  // Scenario 5: Dynamically highlight posts containing specific keywords
  function highlightByKeyword() {
    const keyword = $.trim($("#keyword-input").val()).toLowerCase();
    $(".blog-post").removeClass("keyword-highlight");

    if (!keyword) {
      return;
    }

    $(".blog-post").each(function () {
      const text = $(this).text().toLowerCase();
      if (text.indexOf(keyword) !== -1) {
        $(this).addClass("keyword-highlight");
      }
    });
  }

  $("#btn-highlight-keyword").on("click", highlightByKeyword);
  $("#keyword-input").on("keyup", highlightByKeyword);
});
