
# Table of Contents



    cd .. && npm run lint

    cd .. && npm run test:coverage 2>&1

    (defun run-all-sh-code-blocks ()
      (interactive)
      (org-babel-map-executables nil
        (let ((lang (org-element-property :language (org-element-at-point))))
          (when (string= lang "sh")
            (org-babel-execute-src-block)))))
    
    (run-all-sh-code-blocks)
    
    (org-export-to-file 'md "../README.md")

    (save-excursion
      (goto-char (point-min))
      (while (re-search-forward "#\\+BEGIN_SRC" nil t)
        (org-babel-remove-result)))

