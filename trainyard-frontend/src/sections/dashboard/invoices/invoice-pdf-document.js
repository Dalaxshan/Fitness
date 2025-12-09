import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { useTheme } from '@mui/material/styles';

const useStyles = () => {
  const theme = useTheme();

  return useMemo(() => {
    return StyleSheet.create({
      page: {
        backgroundColor: '#FFFFFF',
        padding: 24,
      },
      h4: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.235,
      },
      h6: {
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
      },
      alignRight: {
        textAlign: 'right',
      },
      subtitle2: {
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body2: {
        fontSize: 10,
        fontWeight: 400,
        lineHeight: 1.43,
      },
      gutterBottom: {
        marginBottom: 4,
      },
      colorSuccess: {
        color: theme.palette.success.main,
      },
      uppercase: {
        textTransform: 'uppercase',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      brand: {
        height: 42,
        width: 50,
      },
      company: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
      },
      references: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
      },
      billing: {
        marginTop: 32,
      },
      items: {
        marginTop: 32,
      },
      itemRow: {
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        borderStyle: 'solid',
        flexDirection: 'row',
      },
      itemNumber: {
        padding: 6,
        width: '10%',
      },
      itemDescription: {
        padding: 6,
        width: '50%',
      },
      itemQty: {
        padding: 6,
        width: '10%',
      },
      itemUnitAmount: {
        padding: 6,
        width: '15%',
      },
      itemTotalAmount: {
        padding: 6,
        width: '15%',
      },
      summaryRow: {
        flexDirection: 'row',
      },
      summaryGap: {
        padding: 6,
        width: '70%',
      },
      summaryTitle: {
        padding: 6,
        width: '15%',
      },
      summaryValue: {
        padding: 6,
        width: '15%',
      },
      notes: {
        marginTop: 32,
      },
    });
  }, [theme]);
};

export const InvoicePdfDocument = (props) => {
  const { invoice } = props;
  const styles = useStyles();

  const dueDate = format(new Date(invoice.dueDate), 'dd MMM yyyy')
  const issueDate = format(new Date(invoice.issuedDate), 'dd MMM yyyy')
  const subtotalAmount = invoice.totalAmount;
  const totalAmount = invoice.totalAmount;

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
          <View>
            <Image
              source="/assets/logo.png"
              style={styles.brand}
            />
          </View>
          <View>
            <Text style={[styles.h4, styles.uppercase, styles.colorSuccess]}>{invoice.status === 'paid' ? 'PAID' : 'DUE'}</Text>
            <Text style={styles.subtitle2}>{invoice.invoiceNumber}</Text>
          </View>
        </View>
        <View style={styles.company}>
          <View>
            <Text style={styles.body2}>One Galle Face Mall</Text>
            <Text style={styles.body2}>No 1 Centre Road,</Text>
            <Text style={styles.body2}>Colombo 00200</Text>
          </View>
          <View>
            <Text style={styles.body2}></Text>
            <Text style={styles.body2}></Text>
          </View>
          <View>
            <Text style={styles.body2}>accounts@trainyard.com</Text>
            <Text style={styles.body2}>011 793 3669</Text>
          </View>
        </View>
        <View style={styles.references}>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>Due Date</Text>
            <Text style={styles.body2}>{dueDate}</Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}></Text>
            <Text style={styles.body2}></Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>Date of Issue</Text>
            <Text style={styles.body2}>{issueDate}</Text>
          </View>
        </View>
        <View style={styles.billing}>
          <Text style={[styles.subtitle2, styles.gutterBottom]}>Billed to</Text>
          <Text style={styles.body2}>{invoice?.customerName}</Text>
          <Text style={styles.body2}>{invoice?.customerMobile}</Text>
          <Text style={styles.body2}>{invoice?.customerAddress}</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.itemRow}>
            <View style={styles.itemNumber}>
              <Text style={styles.h6}>#</Text>
            </View>
            <View style={styles.itemDescription}>
              <Text style={styles.h6}>Description</Text>
            </View>
            <View style={styles.itemQty}>
              <Text style={styles.h6}>Qty</Text>
            </View>
            <View style={styles.itemUnitAmount}>
              <Text style={styles.h6}>Unit Price</Text>
            </View>
            <View style={styles.itemTotalAmount}>
              <Text style={[styles.h6, styles.alignRight]}>Total</Text>
            </View>
          </View>
          <View
            key={'0090'}
            style={styles.itemRow}
          >
            <View style={styles.itemNumber}>
              <Text style={styles.body2}>{1}</Text>
            </View>
            <View style={styles.itemDescription}>
              <Text style={styles.body2}>{invoice.description}</Text>
            </View>
            <View style={styles.itemQty}>
              <Text style={styles.body2}>{1}</Text>
            </View>
            <View style={styles.itemUnitAmount}>
              <Text style={[styles.body2, styles.alignRight]}>{totalAmount}</Text>
            </View>
            <View style={styles.itemTotalAmount}>
              <Text style={[styles.body2, styles.alignRight]}>{totalAmount}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Subtotal</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body2, styles.alignRight]}>{subtotalAmount}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Total</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body2, styles.alignRight]}>{totalAmount}</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.notes}>
          <Text style={[styles.h6, styles.gutterBottom]}>Notes</Text>
          <Text style={styles.body2}>
            Please make sure you have the right bank registration number as I had issues before and
            make sure you guys cover transfer expenses.
          </Text>
        </View> */}
      </Page>
    </Document>
  );
};

InvoicePdfDocument.propTypes = {
  invoice: PropTypes.object.isRequired,
};
