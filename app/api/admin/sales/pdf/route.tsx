import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {
  formatCurrency,
  formatDate,
  formatDateRangeLabel,
} from "@/utils/format";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica" },
  title: { fontSize: 16, marginBottom: 4, fontWeight: 700 },
  subtitle: { fontSize: 10, marginBottom: 16, color: "#555" },
  row: {
    flexDirection: "row",
    borderBottom: "1 solid #ddd",
    paddingVertical: 4,
  },
  headerRow: {
    flexDirection: "row",
    borderBottom: "2 solid #556B2F",
    paddingVertical: 6,
    fontWeight: 700,
  },
  cellId: { width: "18%" },
  cellEmail: { width: "27%" },
  cellNum: { width: "13%", textAlign: "right" },
  cellDate: { width: "16%", textAlign: "right" },
  totalsBox: { marginTop: 16, alignItems: "flex-end" },
});

export const GET = async (req: NextRequest) => {
  const user = await currentUser();
  const admins = process.env.ADMIN_USER_IDS?.split(",") ?? [];
  if (!user || !admins.includes(user.id)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const email = searchParams.get("email");

  const where: any = { isPaid: true };
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }
  if (email) where.email = { contains: email, mode: "insensitive" };

  try {
    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const totals = orders.reduce(
      (acc, o) => {
        acc.orderTotal += o.orderTotal;
        acc.tax += o.tax;
        acc.shipping += o.shipping;
        return acc;
      },
      { orderTotal: 0, tax: 0, shipping: 0 },
    );

    const rangeLabel = formatDateRangeLabel(from, to, email);

    const buffer = await renderToBuffer(
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Salgsrapport</Text>
          <Text style={styles.subtitle}>
            {rangeLabel}
            {"   |   Generert: "}
            {formatDate(new Date())}
          </Text>

          <View style={styles.headerRow}>
            <Text style={styles.cellId}>Ordre-ID</Text>
            <Text style={styles.cellEmail}>E-post</Text>
            <Text style={styles.cellNum}>Beløp</Text>
            <Text style={styles.cellNum}>MVA</Text>
            <Text style={styles.cellNum}>Frakt</Text>
            <Text style={styles.cellDate}>Dato</Text>
          </View>

          {orders.map((o) => (
            <View style={styles.row} key={o.id}>
              <Text style={styles.cellId}>
                {o.id.slice(0, 8).toUpperCase()}
              </Text>
              <Text style={styles.cellEmail}>{o.email}</Text>
              <Text style={styles.cellNum}>{formatCurrency(o.orderTotal)}</Text>
              <Text style={styles.cellNum}>{formatCurrency(o.tax)}</Text>
              <Text style={styles.cellNum}>{formatCurrency(o.shipping)}</Text>
              <Text style={styles.cellDate}>{formatDate(o.createdAt)}</Text>
            </View>
          ))}

          <View style={styles.totalsBox}>
            <Text>Totalt: {formatCurrency(totals.orderTotal)}</Text>
            <Text>Herav MVA: {formatCurrency(totals.tax)}</Text>
            <Text>Frakt: {formatCurrency(totals.shipping)}</Text>
            <Text>Antall bestillinger: {orders.length}</Text>
          </View>
        </Page>
      </Document>,
    );

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="salgsrapport-${new Date()
          .toISOString()
          .slice(0, 10)}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Sales PDF error:", error);
    return Response.json({ error: "Kunne ikke generere PDF" }, { status: 500 });
  }
};