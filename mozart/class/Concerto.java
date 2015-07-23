/*
 * Decompiled with CFR 0_101.
 * 
 * Could not load the following classes:
 *  netscape.javascript.JSException
 *  netscape.javascript.JSObject
 */
import java.applet.Applet;
import java.io.PrintStream;
import java.util.List;
import javax.smartcardio.Card;
import javax.smartcardio.CardChannel;
import javax.smartcardio.CardException;
import javax.smartcardio.CardTerminal;
import javax.smartcardio.CardTerminals;
import javax.smartcardio.CommandAPDU;
import javax.smartcardio.ResponseAPDU;
import javax.smartcardio.TerminalFactory;
import javax.swing.JApplet;
import netscape.javascript.JSException;
import netscape.javascript.JSObject;

public class Concerto
extends JApplet
implements Runnable {
    private static final long serialVersionUID = 1;
    private CardTerminal MyReader;
    private JSObject jso;
    private byte[] ApduArray;
    private Thread tr;

    public Concerto() {
        byte[] arrby = new byte[5];
        arrby[0] = -1;
        arrby[1] = -54;
        this.ApduArray = arrby;
    }

    public static String getHexString(byte[] b) {
        String result = "";
        for (int i = 0; i < b.length; ++i) {
            result = String.valueOf(result) + Integer.toString((b[i] & 255) + 256, 16).substring(1);
        }
        return result;
    }

    private void updateJS(String status) {
        this.updateJS(status, "");
    }

    private void updateJS(String status, String data) {
        System.out.println("Appel javascript : " + status + "/" + data);
        if (this.jso != null) {
            try {
                this.jso.call("updateJS", (Object[])new String[]{status, data});
            }
            catch (JSException e) {
                System.out.println("Impossible de faire un appel javascript.");
                e.printStackTrace();
            }
        }
    }

    @Override
    public void init() {
        try {
            this.jso = JSObject.getWindow((Applet)this);
        }
        catch (JSException e) {
            System.out.println("Impossible de trouver l'objet javascript.");
            e.printStackTrace();
        }
        try {
            TerminalFactory factory = TerminalFactory.getDefault();
            List<CardTerminal> terminals = factory.terminals().list();
            System.out.println("Liste des lecteurs d\u00e9tect\u00e9s : " + terminals);
            if (terminals.size() > 0) {
                this.MyReader = terminals.get(0);
                System.out.println("Connect\u00e9 au premier lecteur.");
                this.tr = new Thread(this);
                this.tr.start();
            } else {
                System.out.println("Aucun lecteur d\u00e9tect\u00e9.");
            }
        }
        catch (CardException e) {
            System.out.println("Impossible de r\u00e9cup\u00e9rer le premier lecteur.");
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        CommandAPDU GetData = new CommandAPDU(this.ApduArray);
        do {
            try {
                do {
                    System.out.println("Attente carte...");
                    this.MyReader.waitForCardPresent(0);
                    System.out.println("Carte d\u00e9tect\u00e9e.");
                    Card card = this.MyReader.connect("*");
                    CardChannel channel = card.getBasicChannel();
                    ResponseAPDU CardApduResponse = channel.transmit(GetData);
                    card.disconnect(true);
                    System.out.println("Carte lue");
                    String carduid = Concerto.getHexString(CardApduResponse.getData());
                    try {
                        Thread.sleep(100);
                    }
                    catch (InterruptedException e1) {
                        e1.printStackTrace();
                    }
                    this.updateJS("cardInserted", carduid);
                    this.MyReader.waitForCardAbsent(0);
                    this.updateJS("cardRemoved");
                } while (true);
            }
            catch (CardException e) {
                System.out.println("Impossible de communiquer avec la carte.");
                e.printStackTrace();
                continue;
            }
            break;
        } while (true);
    }
