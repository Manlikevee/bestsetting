/* A simple TinyMCE configuration that will be applied to textarea elements with the class "simple" */
tinymce.init({
    selector: "textarea.simple",
    plugins: "advlist lists spellchecker autoresize wordcount",
    min_height: 120,
    menubar: false,
    toolbar: "bold italic underline | bullist numlist | spellchecker"
  });
  
  /* A more advanced TinyMCE toolbar configuration that will be applied to textarea elements with the class "advanced" */
  tinymce.init({
    selector: "textarea.advanced",
    plugins:
      "casechange advcode advlist lists spellchecker formatpainter autoresize visualblocks tinydrive image link media imagetools wordcount",
    min_height: 380,
    menubar: false,
    toolbar: [
      "bold italic underline | forecolor | formatselect | alignleft aligncenter alignright | bullist numlist",
      "cut copy paste formatpainter removeformat | casechange visualblocks | spellchecker | link image media | code"
    ]
  });