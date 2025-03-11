/* eslint-disable */

const RiskManagementPolicy = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        RISK MANAGEMENT POLICY
      </h1>

      <p className="text-gray-500 mb-14 text-center">
        Learn about trading risks, our management strategies, and how to invest
        wisely.
      </p>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            1. INTRODUCTION
          </h2>
          <div className="space-y-4 text-gray-500">
            <p>
              Sapphire Broking ("Sapphire") is committed to providing a secure
              and reliable trading environment for its clients. This Risk
              Management Policy outlines the principles, procedures, and
              measures implemented by Sapphire to identify, assess, monitor, and
              mitigate various risks associated with securities trading.
            </p>
            <p>The objective of this policy is to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Protect the interests of clients and stakeholders</li>
              <li>Ensure compliance with regulatory requirements</li>
              <li>Maintain market integrity</li>
              <li>Minimize operational, financial, and systemic risks</li>
              <li>
                Establish a framework for consistent risk management practices
              </li>
            </ul>
            <p>
              This policy applies to all trading activities facilitated by
              Sapphire across various segments including Equity, Futures &
              Options, Currency Derivatives, and Commodity Derivatives.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            2. REGULATORY FRAMEWORK
          </h2>
          <div className="space-y-4 text-gray-500">
            <p>
              Sapphire adheres to the rules, regulations, circulars, and
              guidelines prescribed by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Securities and Exchange Board of India (SEBI)</li>
              <li>National Stock Exchange of India Limited (NSE)</li>
              <li>BSE Limited (BSE)</li>
              <li>Multi Commodity Exchange of India Limited (MCX)</li>
              <li>National Commodity & Derivatives Exchange Limited (NCDEX)</li>
              <li>
                Insurance Regulatory and Development Authority of India (IRDAI)
              </li>
              <li>Other regulatory authorities as applicable</li>
            </ul>
            <p>
              Sapphire's risk management practices are aligned with the
              regulatory framework and are reviewed periodically to incorporate
              any regulatory changes.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            3. MARGIN REQUIREMENTS
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">
              3.1 Initial Margin Requirements
            </h3>
            <p>
              Sapphire collects margins from clients as stipulated by the
              respective exchanges and regulatory authorities. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Value at Risk (VaR) Margin</li>
              <li>Extreme Loss Margin (ELM)</li>
              <li>SPAN Margin</li>
              <li>Exposure Margin</li>
              <li>
                Additional Margins as specified by the exchanges from time to
                time
              </li>
            </ul>

            <h3 className="text-lg font-medium">
              3.2 Margin Collection Process
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Margins are collected upfront from clients before order
                execution.
              </li>
              <li>
                Margins can be provided in the form of cash, approved securities
                (with appropriate haircuts), bank guarantees, or fixed deposit
                receipts.
              </li>
              <li>
                The value of non-cash collateral is subject to haircuts as
                prescribed by the exchanges.
              </li>
              <li>
                For F&O and Currency segments, the full SPAN margin is collected
                upfront before executing any trade.
              </li>
            </ul>

            <h3 className="text-lg font-medium">3.3 Margin Monitoring</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Client margins are monitored on a real-time basis.</li>
              <li>
                Automated systems generate alerts when client margins approach
                predefined thresholds.
              </li>
              <li>
                Clients are notified through SMS, email, or other communication
                channels when additional margin is required.
              </li>
            </ul>

            <h3 className="text-lg font-medium">3.4 Exposure Limits</h3>
            <p>Sapphire defines exposure limits for clients based on:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Available margin (cash and collateral)</li>
              <li>Trading history and pattern</li>
              <li>Financial capability</li>
              <li>Risk profile</li>
            </ul>
            <p>
              The exposure limits may vary across market segments and products
              based on their volatility and liquidity.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            4. POSITION LIMITS
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">
              4.1 Client Level Position Limits
            </h3>
            <p>
              Sapphire enforces position limits for clients as mandated by the
              exchanges and regulatory authorities for various segments:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Market-wide position limits for F&O contracts</li>
              <li>Client-level position limits for currency derivatives</li>
              <li>Open interest limits for commodity derivatives</li>
              <li>Concentration margins for significant positions</li>
            </ul>

            <h3 className="text-lg font-medium">
              4.2 Monitoring of Position Limits
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Positions are monitored on an intraday and end-of-day basis.
              </li>
              <li>
                Automated systems generate alerts when client positions approach
                the prescribed limits.
              </li>
              <li>
                Clients are required to reduce their positions if they exceed
                the permissible limits.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            5. RISK MITIGATION MEASURES
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">5.1 Risk-Based Surveillance</h3>
            <p>
              Sapphire has implemented a comprehensive surveillance system to
              monitor:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Unusual trading patterns</li>
              <li>Concentrated positions</li>
              <li>Price manipulation attempts</li>
              <li>Unauthorized trading activities</li>
              <li>Other suspicious transactions</li>
            </ul>

            <h3 className="text-lg font-medium">5.2 Price Range Checks</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Orders that fall outside the daily price range or circuit limits
                set by the exchanges are rejected.
              </li>
              <li>
                Orders with abnormal price deviations from the last traded price
                may be reviewed before processing.
              </li>
            </ul>

            <h3 className="text-lg font-medium">5.3 Order Value Checks</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Maximum order value limits are set for clients based on their
                trading history and risk profile.
              </li>
              <li>
                Orders exceeding these limits require additional authorization.
              </li>
            </ul>

            <h3 className="text-lg font-medium">5.4 Order Quantity Checks</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Maximum order quantity limits are defined for various securities
                and derivatives contracts.
              </li>
              <li>
                Orders with quantities exceeding these limits may be rejected or
                require additional verification.
              </li>
            </ul>

            <h3 className="text-lg font-medium">
              5.5 Trade Execution Confirmation
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Trade execution confirmations are sent to clients through SMS,
                email, or other communication channels.
              </li>
              <li>
                Clients can access their trade details through the Sapphire
                Terminal and other platforms.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            6. RISK MANAGEMENT FOR DERIVATIVES TRADING
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">
              6.1 Derivatives Risk Assessment
            </h3>
            <p>
              Enhanced risk assessment procedures are implemented for
              derivatives trading. Client suitability for derivatives trading is
              evaluated based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Financial capability</li>
              <li>Trading experience</li>
              <li>Risk appetite</li>
              <li>Investment objectives</li>
            </ul>

            <h3 className="text-lg font-medium">6.2 Stress Testing</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Sapphire conducts regular stress tests to assess the impact of
                extreme market conditions on client portfolios.
              </li>
              <li>
                Margin requirements may be increased based on the results of
                stress tests.
              </li>
            </ul>

            <h3 className="text-lg font-medium">6.3 Option Risk Management</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Additional margin requirements may be imposed for option writing
                positions.
              </li>
              <li>
                Limits on the number of option contracts that can be written by
                a client may be enforced.
              </li>
              <li>
                Monitoring of deep out-of-the-money options and illiquid
                options.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            7. LIQUIDATION POLICY
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">7.1 Margin Shortfall</h3>
            <p>In case of margin shortfall:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Clients are notified and given a reasonable time to fulfill the
                margin requirement.
              </li>
              <li>
                If the margin shortfall is not addressed within the specified
                timeframe, Sapphire reserves the right to liquidate client
                positions to the extent necessary to cover the shortfall.
              </li>
              <li>
                Liquidation will be carried out in accordance with the
                regulatory guidelines and client agreements.
              </li>
            </ul>

            <h3 className="text-lg font-medium">7.2 Liquidation Priority</h3>
            <p>
              The liquidation of positions follows a predetermined priority to
              minimize client losses:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Positions with the highest losses or margin requirements</li>
              <li>Illiquid positions</li>
              <li>Positions in the most liquid contracts or securities</li>
            </ul>

            <h3 className="text-lg font-medium">7.3 Auto Square-Off</h3>
            <p>
              Sapphire may implement auto square-off of client positions in the
              following scenarios:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Failure to meet margin calls</li>
              <li>Technical issues preventing regular margin calls</li>
              <li>Extreme market volatility</li>
              <li>Regulatory directives</li>
              <li>
                Any other circumstances deemed necessary to protect client and
                firm interests
              </li>
            </ul>

            <h3 className="text-lg font-medium">7.4 Auction and Close-Out</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                In case of delivery defaults, positions may be subject to
                auction or close-out as per exchange rules.
              </li>
              <li>
                Any financial implications arising from auction or close-out
                will be borne by the defaulting client.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            8. RISK MANAGEMENT FOR INTERNET-BASED TRADING
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">
              8.1 System Security Measures
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Multi-factor authentication for logging into trading platforms
              </li>
              <li>Encryption of sensitive data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Firewall protection and intrusion detection systems</li>
            </ul>

            <h3 className="text-lg font-medium">
              8.2 System Capacity and Reliability
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Regular assessment of system capacity to handle peak volumes
              </li>
              <li>
                Implementation of redundancy measures to ensure continuous
                service
              </li>
              <li>Backup systems and disaster recovery procedures</li>
            </ul>

            <h3 className="text-lg font-medium">8.3 Order Validation Checks</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Order value limits</li>
              <li>Order quantity limits</li>
              <li>Price range validation</li>
              <li>Order type restrictions based on market conditions</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            9. CLIENT CATEGORIZATION AND MONITORING
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">9.1 Client Risk Profiling</h3>
            <p>Clients are categorized based on various risk parameters:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Trading pattern and volume</li>
              <li>Financial strength</li>
              <li>Default history</li>
              <li>Compliance with margin requirements</li>
              <li>Segment-wise exposure</li>
            </ul>

            <h3 className="text-lg font-medium">
              9.2 High-Risk Client Monitoring
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Enhanced due diligence for high-risk clients</li>
              <li>Higher margin requirements</li>
              <li>Reduced exposure limits</li>
              <li>More frequent monitoring of positions</li>
            </ul>

            <h3 className="text-lg font-medium">
              9.3 Suspicious Transaction Monitoring
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Monitoring of unusual trading patterns</li>
              <li>Identification of potential market abuse</li>
              <li>
                Reporting of suspicious transactions to regulatory authorities
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            10. MARKET RISK MANAGEMENT
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">10.1 Volatility Assessment</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Continuous monitoring of market volatility</li>
              <li>
                Adjustment of margin requirements during high volatility periods
              </li>
              <li>
                Implementation of additional risk controls during extreme market
                conditions
              </li>
            </ul>

            <h3 className="text-lg font-medium">
              10.2 Concentration Risk Management
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Monitoring of concentrated positions in specific securities or
                derivatives
              </li>
              <li>
                Implementation of concentration margins for significant
                positions
              </li>
              <li>Diversification requirements for large portfolios</li>
            </ul>

            <h3 className="text-lg font-medium">
              10.3 Liquidity Risk Management
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Assessment of liquidity in different market segments</li>
              <li>Restricted exposure to illiquid securities</li>
              <li>Increased margins for illiquid positions</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            11. OPERATIONAL RISK MANAGEMENT
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">11.1 System Risk Management</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Implementation of robust trading and back-office systems</li>
              <li>Regular system audits and upgrades</li>
              <li>Disaster recovery and business continuity plans</li>
              <li>Periodic testing of backup systems</li>
            </ul>

            <h3 className="text-lg font-medium">
              11.2 Process Risk Management
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Documented and standardized operating procedures</li>
              <li>Segregation of duties to prevent conflicts of interest</li>
              <li>Regular training of staff on risk management procedures</li>
              <li>Internal control mechanisms and audit trails</li>
            </ul>

            <h3 className="text-lg font-medium">
              11.3 Human Error Risk Management
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Automated validation checks to minimize manual errors</li>
              <li>Four-eye principle for critical operations</li>
              <li>Regular training and awareness programs for staff</li>
              <li>Performance monitoring and feedback mechanisms</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            12. REPORTING AND DOCUMENTATION
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">12.1 Client Reporting</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Regular margin statements to clients</li>
              <li>Position and risk reports</li>
              <li>Alerts for margin shortfalls and position limits</li>
              <li>Trade confirmation and contract notes</li>
            </ul>

            <h3 className="text-lg font-medium">12.2 Regulatory Reporting</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Compliance with all regulatory reporting requirements</li>
              <li>Timely submission of reports to exchanges and regulators</li>
              <li>
                Maintenance of records as prescribed by regulatory authorities
              </li>
            </ul>

            <h3 className="text-lg font-medium">12.3 Internal Reporting</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Daily risk reports to management</li>
              <li>Periodic review of risk parameters and controls</li>
              <li>Exception reports for unusual transactions or breaches</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            13. POLICY REVIEW AND UPDATES
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">13.1 Periodic Review</h3>
            <p>
              This Risk Management Policy shall be reviewed at least annually to
              ensure its effectiveness and relevance.
            </p>

            <h3 className="text-lg font-medium">13.2 Regulatory Updates</h3>
            <p>
              The policy shall be updated promptly to incorporate any changes in
              regulatory requirements or industry best practices.
            </p>

            <h3 className="text-lg font-medium">13.3 Approval Process</h3>
            <p>
              Any modifications to this policy shall be approved by the
              designated authority within Sapphire.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            14. CLIENT AWARENESS AND EDUCATION
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">14.1 Risk Disclosure</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Comprehensive risk disclosure documents provided to clients
              </li>
              <li>
                Clear communication of margin requirements and liquidation
                procedures
              </li>
              <li>Regular updates on changes in risk management practices</li>
            </ul>

            <h3 className="text-lg font-medium">14.2 Client Education</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Educational materials on risk management principles</li>
              <li>Webinars and seminars on prudent trading practices</li>
              <li>Tools and resources for understanding market risks</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            15. DISPUTE RESOLUTION
          </h2>
          <div className="space-y-4 text-gray-500">
            <h3 className="text-lg font-medium">15.1 Client Grievances</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                Established procedures for addressing client grievances related
                to risk management actions
              </li>
              <li>
                Transparency in communication regarding risk-based decisions
              </li>
              <li>Timely resolution of client complaints</li>
            </ul>

            <h3 className="text-lg font-medium">15.2 Internal Escalation</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Clear escalation matrix for risk-related decisions</li>
              <li>Documentation of rationale for risk management actions</li>
              <li>Review of disputed actions by senior management</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            16. CONCLUSION
          </h2>
          <div className="space-y-4 text-gray-500">
            <p>
              This Risk Management Policy aims to establish a robust framework
              for identifying, assessing, and mitigating risks associated with
              securities trading. By implementing these measures, Sapphire
              strives to provide a secure trading environment for its clients
              while maintaining compliance with regulatory requirements.
            </p>
            <p>
              Sapphire reserves the right to modify this policy as deemed
              necessary to address emerging risks, regulatory changes, or
              business requirements. Clients are encouraged to review this
              policy periodically and contact Sapphire for any clarifications.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-heading">
            CONTACT INFORMATION
          </h2>
          <div className="space-y-2 text-gray-500">
            <p>
              For any queries regarding this Risk Management Policy, please
              contact:
            </p>
            <ul className="list-none space-y-1">
              <li>Sapphire Broking</li>
              <li>Email: risk@sapphirebroking.com</li>
              <li>Phone: [Risk Management Department Contact Number]</li>
            </ul>
          </div>
        </section>

        <div className="text-gray-500 italic mt-8">
          <p>
            Please note that the information contained herein is subject to
            change without notice.
          </p>
        </div>

        <div className="text-gray-500 mt-4">
          <p>Last Updated: April 1, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default RiskManagementPolicy;
