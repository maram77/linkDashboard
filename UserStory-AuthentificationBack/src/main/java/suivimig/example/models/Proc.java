package suivimig.example.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Proc{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "profilProc")
    private String profilProc;

    @NotBlank
    @Column(name = "traitement")
    private String traitement;

    @NotBlank
    @Column(name = "nom")
    private String nom;

    @NotBlank
    @Column(name = "priority")
    private String priority;

    @NotBlank
    @Column(name = "sprint")
    private String sprint;

    @NotBlank
    @Column(name = "jiraDev")
    private String jiraDev;

    @NotBlank
    @Column(name = "jiraQa")
    private String jiraQa;

    @NotBlank
    @Column(name = "quiDev")
    private String quiDev;

    @NotBlank
    @Column(name = "quiQa")
    private String quiQa;

    @NotBlank
    @Column(name = "couverture")
    private Boolean couverture;

    @Column(name = "dateMAJ")
    private String dateMAJ;

    @Column(name = "date_creation")
    private String date_creation;

    @Column(name = "comment")
    private String comment;

    @Column(name="prioriteJas")
    private int prioriteJas;

    @Column(name="jiraJas")
    private String jiraJas;

    @Column(name="commentaireJas")
    private String commentaireJas;


    /* ----------------------------------------------------------*/
    @ManyToOne
    private Scrum scrum;

    /*-----------------------------------------------------------*/
    @ManyToOne
    private StatutDev statutDev;

    /*-----------------------------------------------------------*/
    @ManyToOne
    private StatutQa statutQa;

    /*-----------------------------------------------------------*/
    @ManyToOne
    private StatutTraduction statutTraduction;

    /*-----------------------------------------------------------*/
    @ManyToOne
    private PrdSp prdSp;

    /*-----------------------------------------------------------*/
    @ManyToOne
    private StatutJasper statutJasper;

    /*-----------------------------------------------------------*/
    @ManyToOne
    private Product product;
    /*-----------------------------------------------------------*/
    @Column(name="couvert")
    private boolean couvert;

    public Proc() {
    }


}
